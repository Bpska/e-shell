const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config for file uploads (PPT + Video)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        let prefix = 'file';
        if (file.fieldname === 'ppt') prefix = 'ppt';
        if (file.fieldname === 'payment_screenshot') prefix = 'pay';
        cb(null, `${prefix}-${uniqueSuffix}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedPpt = ['.ppt', '.pptx', '.pdf'];
        const allowedImg = ['.jpg', '.jpeg', '.png', '.webp'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (file.fieldname === 'payment_screenshot' && allowedImg.includes(ext)) return cb(null, true);
        if (file.fieldname === 'ppt' && allowedPpt.includes(ext)) return cb(null, true);
        cb(new Error('File type not allowed.'));
    },
});

const uploadFields = upload.fields([
    { name: 'ppt', maxCount: 1 },
    { name: 'payment_screenshot', maxCount: 1 },
]);

// ──────────────────────────────────────────────
// POST /api/register — Create a new registration
// ──────────────────────────────────────────────
app.post('/api/register', uploadFields, async (req, res) => {
    try {
        const { teamName, college, state, contact, email, theme, idea, event, members, videoLink, brandName, memberCount, utrNumber } = req.body;

        const isIdea2Impact = event === 'Idea 2 Impact';
        const isMockSharkTank = event === 'Mock Shark Tank';
        const isLocal2Vocal = event === 'Local 2 Vocal';

        // Validate absolute base required fields
        if (!contact || !email || !event || !teamName) {
            return res.status(400).json({ error: 'Core required fields (Name, Contact, Email, Event) must be filled.' });
        }

        // Local 2 Vocal specific flow
        if (isLocal2Vocal) {
            if (!brandName || !memberCount) {
                return res.status(400).json({ error: 'Brand name and Number of Members are required.' });
            }
            const paymentScreenshot = req.files && req.files['payment_screenshot'] ? req.files['payment_screenshot'][0].filename : null;
            const regResult = await db.query(
                `INSERT INTO registrations (team_name, contact, email, brand_name, member_count, utr_number, payment_screenshot, event_name)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id`,
                [teamName, contact, email, brandName, memberCount, utrNumber || null, paymentScreenshot || null, event]
            );
            return res.status(201).json({ message: 'Registration successful!', registrationId: regResult.rows[0].id });
        }

        // For other events, validate common fields
        if (!college || !state) {
            return res.status(400).json({ error: 'College and State are required.' });
        }
        if (!isMockSharkTank && !idea) {
            return res.status(400).json({ error: 'Idea description is required.' });
        }
        const isIndividualEvent = isIdea2Impact || isMockSharkTank;

        // Event-specific validation
        if (!isIndividualEvent) {
            // Team-based events (Techspaire)
            if (!teamName || !theme) {
                return res.status(400).json({ error: 'Team name and theme are required.' });
            }

            let parsedMembers;
            try {
                parsedMembers = typeof members === 'string' ? JSON.parse(members) : members;
            } catch {
                return res.status(400).json({ error: 'Invalid members data.' });
            }

            if (!parsedMembers || parsedMembers.length < 3) {
                return res.status(400).json({ error: 'At least 3 team members are required.' });
            }

            const pptFilename = req.files && req.files['ppt'] ? req.files['ppt'][0].filename : null;
            const paymentScreenshot = req.files && req.files['payment_screenshot'] ? req.files['payment_screenshot'][0].filename : null;

            const regResult = await db.query(
                `INSERT INTO registrations (team_name, college, state, contact, email, theme, idea, ppt_filename, utr_number, payment_screenshot, event_name)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING id`,
                [teamName, college, state, contact, email, theme, idea, pptFilename, utrNumber || null, paymentScreenshot || null, event]
            );

            const registrationId = regResult.rows[0].id;

            for (let i = 0; i < parsedMembers.length; i++) {
                const member = parsedMembers[i];
                if (member.name && member.email && member.phone) {
                    await db.query(
                        `INSERT INTO team_members (registration_id, name, email, phone, is_optional)
                         VALUES ($1, $2, $3, $4, $5)`,
                        [registrationId, member.name, member.email, member.phone, i >= 3]
                    );
                }
            }

            res.status(201).json({ message: 'Registration successful!', registrationId });

        } else {
            // Individual lead registration (Idea 2 Impact / Mock Shark Tank)
            if (!teamName) {
                return res.status(400).json({ error: 'Lead name is required.' });
            }

            // theme can be null for Idea 2 Impact, but provided for Mock Shark Tank
            // idea can be text for Idea 2 Impact, but optional/empty for Mock Shark Tank
            const finalTheme = isMockSharkTank ? theme : null;
            const finalIdea = idea || 'Video Explaining Idea';

            // Payment proof for Mock Shark Tank
            const payScreenshot = isMockSharkTank && req.files && req.files['payment_screenshot'] ? req.files['payment_screenshot'][0].filename : null;
            const finalUtr = isMockSharkTank ? (utrNumber || null) : null;

            const regResult = await db.query(
                `INSERT INTO registrations (team_name, college, state, contact, email, theme, idea, video_link, utr_number, payment_screenshot, event_name)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING id`,
                [teamName, college, state, contact, email, finalTheme, finalIdea, videoLink || null, finalUtr, payScreenshot, event]
            );

            res.status(201).json({ message: 'Registration successful!', registrationId: regResult.rows[0].id });
        }

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// ──────────────────────────────────────────────
// GET /api/registrations — List all registrations
// ──────────────────────────────────────────────
app.get('/api/registrations', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT r.*, 
              COALESCE(
                json_agg(json_build_object(
                  'id', tm.id,
                  'name', tm.name,
                  'email', tm.email,
                  'phone', tm.phone,
                  'isOptional', tm.is_optional
                )) FILTER (WHERE tm.id IS NOT NULL),
                '[]'::json
              ) AS members
       FROM registrations r
       LEFT JOIN team_members tm ON r.id = tm.registration_id
       GROUP BY r.id
       ORDER BY r.created_at DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// ──────────────────────────────────────────────
// GET /api/registrations/:id — Get single registration
// ──────────────────────────────────────────────
app.get('/api/registrations/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const regResult = await db.query('SELECT * FROM registrations WHERE id = $1', [id]);
        if (regResult.rows.length === 0) {
            return res.status(404).json({ error: 'Registration not found.' });
        }

        const membersResult = await db.query(
            'SELECT * FROM team_members WHERE registration_id = $1 ORDER BY id',
            [id]
        );

        res.json({
            ...regResult.rows[0],
            members: membersResult.rows,
        });
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// ──────────────────────────────────────────────
// DELETE /api/registrations/:id — Delete registration
// ──────────────────────────────────────────────
app.delete('/api/registrations/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const regResult = await db.query('SELECT ppt_filename FROM registrations WHERE id = $1', [id]);
        if (regResult.rows.length === 0) {
            return res.status(404).json({ error: 'Registration not found.' });
        }

        // Delete uploaded PPT
        const { ppt_filename } = regResult.rows[0];
        if (ppt_filename) {
            const filePath = path.join(uploadsDir, ppt_filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await db.query('DELETE FROM registrations WHERE id = $1', [id]);

        res.json({ message: 'Registration deleted successfully.' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
