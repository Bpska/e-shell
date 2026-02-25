-- Create the database (run this manually first):
-- CREATE DATABASE eshell;

-- Then connect to eshell and run the rest:

CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255),
    college VARCHAR(255),
    state VARCHAR(100),
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    brand_name VARCHAR(255),
    member_count VARCHAR(50),
    idea TEXT,
    ppt_filename VARCHAR(255),
    video_link TEXT,
    utr_number VARCHAR(100),
    payment_screenshot VARCHAR(255),
    event_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    registration_id INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_optional BOOLEAN DEFAULT FALSE
);
