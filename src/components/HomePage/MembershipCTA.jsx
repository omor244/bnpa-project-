import React from 'react';
import { Download } from 'lucide-react';
import { Link } from 'react-router';

export default function MembershipCTA() {
    return (
        <section className="w-full">
            {/* Updated gradient to use the brand teal [#26bba4] */}
            <div className="bg-gradient-to-r from-[#26bba4] via-[#1f9d8a] to-[#1a7f6f] py-10 px-6 md:px-12 lg:px-24">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Left Side: Text Updated to BNPA */}
                    <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
                        Be a part of BNPA, Become a member <span className="ml-2">→</span>
                    </h2>

                    {/* Right Side: Download Button */}
                    <Link
                        // You will need to update this path to your actual BNPA membership form
                        to="/files/BNPA-Membership-Form.pdf"
                        target='_blank'
                        className="group flex items-center gap-2 bg-white text-[#26bba4] font-bold py-3 px-8 rounded shadow-lg transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 uppercase tracking-wider text-sm"
                    >
                        <Download size={18} className="group-hover:animate-bounce" />
                        Download Form
                    </Link>

                </div>
            </div>
        </section>
    );
}