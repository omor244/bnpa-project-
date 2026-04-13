import React from 'react';

import { Home, ArrowLeft, Search, Map } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center bg-white px-6">
            <div className="max-w-2xl w-full text-center">

                {/* Animated 404 Visual */}
                <div className="relative mb-8">
                    <h1 className="text-[12rem] md:text-[15rem] font-black text-slate-50 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                        <div className="bg-[#26bba4] text-white p-4 rounded-2xl shadow-xl rotate-3 mb-4">
                            <Map size={48} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                            Oops! Page Not Found
                        </h2>
                    </div>
                </div>

                {/* Message */}
                <p className="text-slate-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 bg-white text-slate-900 border-2 border-slate-100 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition-all active:scale-95 w-full sm:w-auto"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Quick Help Section */}
                <div className="mt-16 pt-8 border-t border-slate-100">
                    <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-widest">
                        Need immediate help?
                    </p>
                    <div className="flex justify-center gap-8 text-slate-500">
                        <Link href="/contact" className="hover:text-[#26bba4] transition-colors text-sm flex items-center gap-1">
                            <Search size={14} /> Contact Support
                        </Link>
                        <Link href="/about" className="hover:text-[#26bba4] transition-colors text-sm flex items-center gap-1">
                            <Search size={14} /> About BASSA
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}