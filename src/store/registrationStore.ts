export interface Registration {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    college_company: string;
    role: string;
    event_type: string;
    fee: string;
    payment_status: 'paid' | 'pending';
    timestamp: string;
}

const STORAGE_KEY = 'efest_registrations';

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getRegistrations(): Registration[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveRegistration(reg: Registration): void {
    const registrations = getRegistrations();
    registrations.push(reg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}

export function deleteRegistration(id: string): void {
    const registrations = getRegistrations().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}

export function getStats() {
    const registrations = getRegistrations();
    const totalRevenue = registrations
        .filter(r => r.payment_status === 'paid')
        .reduce((sum, r) => sum + parseInt(r.fee.replace(/[₹,]/g, '') || '0'), 0);

    const eventBreakdown: Record<string, number> = {};
    registrations.forEach(r => {
        eventBreakdown[r.event_type] = (eventBreakdown[r.event_type] || 0) + 1;
    });

    return {
        total: registrations.length,
        paid: registrations.filter(r => r.payment_status === 'paid').length,
        pending: registrations.filter(r => r.payment_status === 'pending').length,
        totalRevenue,
        eventBreakdown,
    };
}

export function exportToCSV(): string {
    const registrations = getRegistrations();
    const headers = ['ID', 'Name', 'Email', 'Phone', 'College/Company', 'Role', 'Event', 'Fee', 'Payment Status', 'Date'];
    const rows = registrations.map(r => [
        r.id,
        r.full_name,
        r.email,
        r.phone,
        r.college_company,
        r.role,
        r.event_type,
        r.fee,
        r.payment_status,
        new Date(r.timestamp).toLocaleString()
    ]);
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}
