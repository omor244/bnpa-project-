import React from 'react';
import {
    Users,
    UserCheck,
    FileText,
    TrendingUp,
    Clock,
    ArrowUpRight,
    Gavel
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

const Dashboard = () => {
    // Mock data for the overview
    const stats = [
        { title: "Total Members", value: "1,284", icon: Users, trend: "+12%", color: "text-blue-600" },
        { title: "Life Members", value: "432", icon: UserCheck, trend: "+5%", color: "text-emerald-600" },
        { title: "Pending Apps", value: "18", icon: Clock, trend: "Requires Action", color: "text-amber-600" },
        { title: "Auction Items", value: "85", icon: Gavel, trend: "Active Now", color: "text-[#26bba4]" },
    ];

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            {/* 1. Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 text-sm">Welcome back to the BNPA Administration Portal.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
                        Download Report
                    </button>
                    <button className="bg-[#26bba4] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1f9d8a] transition-all shadow-lg shadow-emerald-900/10">
                        Add New Member
                    </button>
                </div>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {stat.title}
                            </CardTitle>
                            <stat.icon size={20} className={stat.color} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                <TrendingUp size={12} className="text-[#26bba4]" />
                                <span className="text-[#26bba4] font-medium">{stat.trend}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3. Recent Membership Applications */}
                <Card className="lg:col-span-2 border-none shadow-sm bg-white rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-slate-800">Recent Applications</CardTitle>
                        <button className="text-[#26bba4] text-xs font-bold hover:underline">View All</button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                            OF
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Omor Faruk</p>
                                            <p className="text-xs text-slate-500">omoronfire90909@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase">Pending</span>
                                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-[#26bba4] transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Activity / Notifications */}
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800">System Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#26bba4] mt-1.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-slate-800">New Auction Live</p>
                                    <p className="text-[11px] text-slate-500">1971 Commemorative series added.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Database Backup</p>
                                    <p className="text-[11px] text-slate-500">Successfully completed at 2:00 AM.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;