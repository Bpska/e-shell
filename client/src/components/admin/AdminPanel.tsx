import { useState, useEffect, useCallback } from 'react';
import {
    Users, Calendar, Search, Trash2, Download,
    LogOut, LayoutDashboard, ListOrdered, Shield, ChevronDown, Menu, X,
    Eye, UserPlus, MapPin, Mail, Phone, Lightbulb, FileText, RefreshCw, Building2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface TeamMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    isOptional: boolean;
}

interface Registration {
    id: number;
    team_name: string;
    college: string;
    state: string;
    contact: string;
    email: string;
    theme: string;
    brand_name: string | null;
    member_count: string | null;
    idea: string;
    ppt_filename: string | null;
    video_link: string | null;
    utr_number: string | null;
    payment_screenshot: string | null;
    event_name: string;
    created_at: string;
    members: TeamMember[];
}

type Tab = 'dashboard' | 'registrations';

export default function AdminPanel() {
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuth(true);
            setAuthError('');
        } else {
            setAuthError('Invalid password');
        }
    };

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-sm">
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-white" size={24} />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
                            <p className="text-slate-500 text-sm mt-1">Enter your credentials to continue</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>
                            {authError && (
                                <p className="text-red-600 text-xs font-bold bg-red-50 p-2.5 rounded-lg text-center">{authError}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-sm shadow-indigo-200"
                            >
                                Sign In
                            </button>
                        </form>
                        <a
                            href="#/"
                            className="block text-center mt-6 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors"
                        >
                            ← Back to Website
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`w-64 bg-[#1e293b] flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Shield size={18} />
                        </div>
                        E-FEST
                    </h2>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white p-1">
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 px-4 mt-2 space-y-1">
                    <button
                        onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'dashboard' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button
                        onClick={() => { setActiveTab('registrations'); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'registrations' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <ListOrdered size={16} /> Registrations
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => { setIsAuth(false); setPassword(''); }}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/5 font-bold text-xs transition-all"
                    >
                        <LogOut size={16} /> Log out
                    </button>
                </div>
            </aside>

            <main className="flex-1 md:ml-64">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                            <Menu size={20} />
                        </button>
                        <h1 className="text-lg font-bold text-slate-900 italic">
                            {activeTab === 'dashboard' ? 'Overview' : 'Registrations'}
                        </h1>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                        Admin Session
                    </span>
                </header>
                <div className="p-4 sm:p-8">
                    {activeTab === 'dashboard' ? <DashboardView /> : <RegistrationsView />}
                </div>
            </main>
        </div>
    );
}

/* ─── Dashboard ─── */
function DashboardView() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/registrations`)
            .then(res => res.json())
            .then(data => { setRegistrations(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const total = registrations.length;
    const eventBreakdown: Record<string, number> = {};
    registrations.forEach(r => {
        eventBreakdown[r.event_name] = (eventBreakdown[r.event_name] || 0) + 1;
    });
    const totalMembers = registrations.reduce((sum, r) => sum + (r.members?.length || 0), 0);
    const recent = registrations.slice(0, 5);

    const cards = [
        { label: 'Total Teams', value: total, icon: <Users size={20} />, textColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
        { label: 'Total Members', value: totalMembers, icon: <UserPlus size={20} />, textColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
        { label: 'Events Active', value: Object.keys(eventBreakdown).length, icon: <Calendar size={20} />, textColor: 'text-sky-600', bgColor: 'bg-sky-50' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className={`${card.bgColor} ${card.textColor} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                            {card.icon}
                        </div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{card.label}</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-900 font-bold text-sm mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        Event Breakdown
                    </h3>
                    <div className="space-y-4">
                        {Object.keys(eventBreakdown).length === 0 ? (
                            <p className="text-slate-400 text-xs font-medium">No registrations yet</p>
                        ) : (
                            Object.entries(eventBreakdown).map(([event, count]) => (
                                <div key={event} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <span className="text-slate-600">{event}</span>
                                        <span className="text-slate-900">{count} team{count > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${(count / total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-900 font-bold text-sm mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        Recent Registrations
                    </h3>
                    <div className="space-y-3">
                        {recent.length === 0 ? (
                            <p className="text-slate-400 text-xs font-medium">No registrations yet</p>
                        ) : (
                            recent.map(r => (
                                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div>
                                        <p className="text-slate-900 font-bold text-xs">{r.team_name}</p>
                                        <p className="text-slate-400 text-[10px] font-bold mt-0.5">{r.event_name}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">
                                        {new Date(r.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Registrations Table ─── */
function RegistrationsView() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const fetchRegistrations = useCallback(() => {
        setLoading(true);
        fetch(`${API_URL}/registrations`)
            .then(res => res.json())
            .then(data => { setRegistrations(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

    const filtered = registrations.filter(r => {
        const matchesSearch = !search ||
            r.team_name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            r.college.toLowerCase().includes(search.toLowerCase()) ||
            r.contact.includes(search);
        const matchesEvent = !filterEvent || r.event_name === filterEvent;
        return matchesSearch && matchesEvent;
    });

    const handleDelete = async (id: number) => {
        if (confirm('Permanently delete this registration and all its team members?')) {
            try {
                const res = await fetch(`${API_URL}/registrations/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchRegistrations();
                }
            } catch (err) {
                console.error('Delete failed:', err);
            }
        }
    };

    const handleExport = () => {
        const headers = ['ID', 'Team Name', 'College', 'State', 'Contact', 'Email', 'Theme', 'Idea', 'Event', 'Members', 'Date'];
        const rows = filtered.map(r => [
            r.id,
            r.team_name,
            r.college,
            r.state,
            r.contact,
            r.email,
            r.theme,
            `"${r.idea.replace(/"/g, '""')}"`,
            r.event_name,
            r.members?.map(m => `${m.name} (${m.email})`).join('; ') || '',
            new Date(r.created_at).toLocaleDateString(),
        ]);
        const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `efest_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const events = [...new Set(registrations.map(r => r.event_name))];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search teams, emails, colleges..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                    />
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                    <div className="relative">
                        <select
                            value={filterEvent}
                            onChange={(e) => setFilterEvent(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs focus:outline-none focus:border-indigo-500 font-bold cursor-pointer"
                        >
                            <option value="">All Events</option>
                            {events.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                    </div>
                    <button
                        onClick={fetchRegistrations}
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs hover:bg-slate-200 transition-all"
                    >
                        <RefreshCw size={14} /> Refresh
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                    >
                        <Download size={14} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Count */}
            <p className="text-slate-400 text-xs font-bold">
                Showing {filtered.length} of {registrations.length} registration{registrations.length !== 1 ? 's' : ''}
            </p>

            {/* Registration Cards */}
            <div className="space-y-4">
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                        <p className="text-slate-400 font-medium">No registrations found</p>
                    </div>
                ) : (
                    filtered.map(r => (
                        <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* Header Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm">
                                        #{r.id}
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-black text-sm tracking-tight">{r.team_name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-md">{r.event_name}</span>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {new Date(r.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-bold transition-all"
                                    >
                                        <Eye size={14} />
                                        {expandedId === r.id ? 'Collapse' : 'Details'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(r.id)}
                                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="px-5 pb-4 flex flex-wrap gap-4 text-xs">
                                <span className="flex items-center gap-1.5 text-slate-500">
                                    <MapPin size={12} className="text-slate-400" /> {r.college}, {r.state}
                                </span>
                                <span className="flex items-center gap-1.5 text-slate-500">
                                    <Mail size={12} className="text-slate-400" /> {r.email}
                                </span>
                                <span className="flex items-center gap-1.5 text-slate-500">
                                    <Phone size={12} className="text-slate-400" /> {r.contact}
                                </span>
                                {r.members?.length > 0 && (
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <Users size={12} className="text-slate-400" /> {r.members.length} members
                                    </span>
                                )}
                                {r.event_name === 'Idea 2 Impact' && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">
                                        IDEA 2 IMPACT - LEAD
                                    </span>
                                )}
                                {r.event_name === 'Mock Shark Tank' && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
                                        SHARK TANK - LEAD
                                    </span>
                                )}
                                {r.event_name === 'Local 2 Vocal' && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-100">
                                        LOCAL 2 VOCAL
                                    </span>
                                )}
                            </div>

                            {/* Expanded Details */}
                            {expandedId === r.id && (
                                <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-6 animate-fadeIn">

                                    {/* Local 2 Vocal Specifics */}
                                    {r.event_name === 'Local 2 Vocal' && (
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="bg-white rounded-xl p-4 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Building2 size={14} className="text-orange-500" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Brand Name</span>
                                                </div>
                                                <p className="text-slate-800 font-bold text-sm">{r.brand_name || 'N/A'}</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users size={14} className="text-slate-500" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Number of Members</span>
                                                </div>
                                                <p className="text-slate-800 font-bold text-sm">{r.member_count || 'N/A'}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Theme & Idea (for non Local 2 Vocal) */}
                                    {r.event_name !== 'Local 2 Vocal' && (
                                        <div className={`grid ${r.theme ? 'sm:grid-cols-2' : ''} gap-4`}>
                                            {r.theme && (
                                                <div className="bg-white rounded-xl p-4 border border-slate-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Lightbulb size={14} className="text-amber-500" />
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Theme</span>
                                                    </div>
                                                    <p className="text-slate-800 font-bold text-sm">{r.theme}</p>
                                                </div>
                                            )}
                                            {r.idea && (
                                                <div className="bg-white rounded-xl p-4 border border-slate-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FileText size={14} className="text-blue-500" />
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Idea</span>
                                                    </div>
                                                    <p className="text-slate-800 font-medium text-sm leading-relaxed">{r.idea}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* PPT File */}
                                    {r.ppt_filename && (
                                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText size={14} className="text-indigo-500" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Uploaded PPT</span>
                                            </div>
                                            <a
                                                href={`${API_URL.replace('/api', '')}/uploads/${r.ppt_filename}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 font-bold text-xs hover:underline"
                                            >
                                                📎 {r.ppt_filename}
                                            </a>
                                        </div>
                                    )}

                                    {/* Video Demo Link */}
                                    {r.video_link && (
                                        <div className="bg-white rounded-xl p-4 border border-purple-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Eye size={14} className="text-purple-500" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Prototype Video Link</span>
                                            </div>
                                            <a
                                                href={r.video_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-600 font-bold text-xs hover:underline flex items-center gap-1"
                                            >
                                                🎬 Google Drive Link ↗
                                            </a>
                                        </div>
                                    )}

                                    {/* ═══════ PAYMENT PROOF SECTION ═══════ */}
                                    {(r.event_name === 'Techspaire 1.0' || r.event_name === 'Local 2 Vocal' || r.event_name === 'Mock Shark Tank') && (
                                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200/60">
                                            {/* Section Header */}
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
                                                        <span className="text-white text-sm">💳</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-slate-900 font-black text-sm tracking-tight">Payment Details</h4>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transaction Proof</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500 text-white">
                                                    {r.event_name === 'Techspaire 1.0' ? '₹299' : r.event_name === 'Local 2 Vocal' ? '₹5,000' : '₹199'}
                                                </span>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {/* UTR Number Card */}
                                                <div className="bg-white rounded-xl p-4 border border-amber-200/50">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-sm">🔢</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">UTR / Transaction Number</span>
                                                    </div>
                                                    {r.utr_number ? (
                                                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                                            <p className="text-amber-800 font-black text-lg tracking-wider font-mono">{r.utr_number}</p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-slate-400 text-xs font-bold italic">Not provided</p>
                                                    )}
                                                </div>

                                                {/* Payment Screenshot Card */}
                                                <div className="bg-white rounded-xl p-4 border border-amber-200/50">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-sm">📸</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Payment Screenshot</span>
                                                    </div>
                                                    {r.payment_screenshot ? (
                                                        <div className="space-y-2">
                                                            <a
                                                                href={`${API_URL.replace('/api', '')}/uploads/${r.payment_screenshot}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block"
                                                            >
                                                                <img
                                                                    src={`${API_URL.replace('/api', '')}/uploads/${r.payment_screenshot}`}
                                                                    alt="Payment Screenshot"
                                                                    className="w-full h-36 object-cover rounded-lg border border-amber-200 hover:opacity-90 transition-opacity cursor-pointer"
                                                                />
                                                            </a>
                                                            <a
                                                                href={`${API_URL.replace('/api', '')}/uploads/${r.payment_screenshot}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 text-amber-700 font-bold text-xs hover:underline"
                                                            >
                                                                <Download size={12} /> View Full Image ↗
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <p className="text-slate-400 text-xs font-bold italic">Not uploaded</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Team Members — only show if members exist */}
                                    {r.members?.length > 0 && (
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <UserPlus size={14} /> Team Members
                                            </h4>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {r.members.filter(m => m.name).map((member, idx) => (
                                                    <div key={member.id || idx} className={`bg-white rounded-xl p-4 border ${member.isOptional ? 'border-amber-200' : 'border-slate-100'}`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-black text-slate-900 text-xs">{member.name}</span>
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${member.isOptional
                                                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                                                }`}>
                                                                {member.isOptional ? 'Optional' : `Member ${idx + 1}`}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-500 text-[11px] font-medium">{member.email}</p>
                                                        <p className="text-slate-400 text-[11px] font-medium">{member.phone}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div >
    );
}
