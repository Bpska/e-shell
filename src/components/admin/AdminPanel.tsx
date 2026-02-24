import { useState } from 'react';
import { getStats, getRegistrations, deleteRegistration, exportToCSV } from '../../store/registrationStore';
import type { Registration } from '../../store/registrationStore';
import {
    Users, DollarSign, Calendar, Clock, Search, Trash2, Download,
    LogOut, LayoutDashboard, ListOrdered, Shield, ChevronDown, Menu, X
} from 'lucide-react';

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
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-[#1e293b] flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}>
                <div className="p-6 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Shield size={18} />
                        </div>
                        E-FEST
                    </h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-white p-1"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 px-4 mt-2 space-y-1">
                    <button
                        onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'dashboard'
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </button>
                    <button
                        onClick={() => { setActiveTab('registrations'); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'registrations'
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <ListOrdered size={16} />
                        Registrations
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => { setIsAuth(false); setPassword(''); }}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/5 font-bold text-xs transition-all"
                    >
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-lg font-bold text-slate-900 italic">
                            {activeTab === 'dashboard' ? 'Overview' : 'Registrations'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                            Admin Session
                        </span>
                    </div>
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
    const stats = getStats();
    const registrations = getRegistrations();
    const recent = registrations.slice(-5).reverse();

    const cards = [
        { label: 'Total Sales', value: stats.total, icon: <Users size={20} />, textColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
        { label: 'Net Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} />, textColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
        { label: 'Confirmed', value: stats.paid, icon: <Calendar size={20} />, textColor: 'text-sky-600', bgColor: 'bg-sky-50' },
        { label: 'Pending', value: stats.pending, icon: <Clock size={20} />, textColor: 'text-amber-600', bgColor: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        Event Performance
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(stats.eventBreakdown).length === 0 ? (
                            <p className="text-slate-400 text-xs font-medium">No activity data</p>
                        ) : (
                            Object.entries(stats.eventBreakdown).map(([event, count]) => (
                                <div key={event} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <span className="text-slate-600">{event}</span>
                                        <span className="text-slate-900">{count}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${(count / stats.total) * 100}%` }}
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
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        {recent.length === 0 ? (
                            <p className="text-slate-400 text-xs font-medium">No registrations logged</p>
                        ) : (
                            recent.map(r => (
                                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div>
                                        <p className="text-slate-900 font-bold text-xs">{r.full_name}</p>
                                        <p className="text-slate-400 text-[10px] font-bold mt-0.5">{r.event_type}</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${r.payment_status === 'paid'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                        {r.payment_status.toUpperCase()}
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
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [, setRefresh] = useState(0);

    const allRegistrations = getRegistrations();

    const filtered = allRegistrations.filter((r: Registration) => {
        const matchesSearch = !search ||
            r.full_name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            r.phone.includes(search) ||
            r.college_company.toLowerCase().includes(search.toLowerCase());
        const matchesEvent = !filterEvent || r.event_type === filterEvent;
        const matchesStatus = !filterStatus || r.payment_status === filterStatus;
        return matchesSearch && matchesEvent && matchesStatus;
    }).reverse();

    const handleDelete = (id: string) => {
        if (confirm('Permanently delete this record?')) {
            deleteRegistration(id);
            setRefresh(v => v + 1);
        }
    };

    const handleExport = () => {
        const csv = exportToCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `efest_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const events = [...new Set(allRegistrations.map(r => r.event_type))];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Quick search..."
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
                            <option value="">Events</option>
                            {events.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                    </div>
                    <div className="relative">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs focus:outline-none focus:border-indigo-500 font-bold cursor-pointer"
                        >
                            <option value="">Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                    >
                        <Download size={14} />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-3.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">Name & Role</th>
                                <th className="px-6 py-3.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">Contact Details</th>
                                <th className="px-6 py-3.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">Event info</th>
                                <th className="px-6 py-3.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">Payment</th>
                                <th className="px-6 py-3.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">Timestamp</th>
                                <th className="px-6 py-3.5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No records found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(r => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-slate-900 font-black mb-0.5 tracking-tight">{r.full_name}</p>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{r.role}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-600 font-medium">{r.email}</p>
                                            <p className="text-slate-400 text-[10px] mt-0.5 font-bold italic">{r.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-800 font-bold mb-0.5">{r.event_type}</p>
                                            <p className="text-slate-400 text-[10px] font-bold">{r.college_company}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-900 font-black">{r.fee}</span>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${r.payment_status === 'paid'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                    {r.payment_status.toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 font-bold tabular-nums">
                                            {new Date(r.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
