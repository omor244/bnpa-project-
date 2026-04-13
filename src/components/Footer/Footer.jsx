import Logo from '@/components/Logo/Logo';
import { Mail, MapPin, Send } from 'lucide-react';
import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Updated social links for BNPA
    const socialLinks = [
        { icon: FaFacebook, href: "#", label: "Facebook" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
        { icon: FaYoutube, href: "#", label: "YouTube" },
        { icon: Send, href: "#", label: "Telegram" },
    ];

    return (
        <footer className="bg-white pt-16 pb-8 border-t border-slate-100">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Logo & About */}
                    <div className="flex flex-col space-y-4 items-center md:items-start text-center md:text-left">
                        <Logo />
                        <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-[200px]">
                            Bangladesh National Philatelic Association (BNPA)
                        </p>

                        <div className="flex justify-center gap-6 mt-4">
                            {socialLinks.map((social, i) => (
                                <Link
                                    key={i}
                                    to={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-[#26bba4] transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Philatelic Resources (Quick Links 1) */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">Resources</h4>
                        <ul className="space-y-3 text-slate-500 text-sm">
                            {["Bangladesh Post", "UPU - Universal Postal Union", "Stamp World Catalogue", "FIP Philately"].map((link) => (
                                <li key={link} className="hover:text-[#26bba4] transition-colors">
                                    <Link to="/">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community (Quick Links 2) */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">The Association</h4>
                        <ul className="space-y-3 text-slate-500 text-sm">
                            {["About Us", "Executive Committee", "Upcoming Auctions", "Membership Info"].map((link) => (
                                <li key={link} className="hover:text-[#26bba4] transition-colors">
                                    <Link to="/">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact BNPA */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">Contact Us</h4>
                        <div className="space-y-4 text-slate-500 text-sm">
                            <div className="flex items-start gap-3 justify-center md:justify-start">
                                <Mail size={18} className="text-[#26bba4] shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-700">Email</p>
                                    <p>info@bnpa.bd</p>
                                    <p>secretary@bnpa.bd</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 justify-center md:justify-start">
                                <MapPin size={18} className="text-[#26bba4] shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-700">Postal Address</p>
                                    <p>GPO Box 2525, Dhaka-1000, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Copyright Bar */}
                <div className="border-t border-slate-100 pt-8 text-center">
                    <p className="text-slate-400 text-xs md:text-sm">
                        Copyright © {currentYear} <span className="font-semibold text-slate-600 uppercase tracking-tight"> CIT {"{creators information technologies}"}</span> All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}