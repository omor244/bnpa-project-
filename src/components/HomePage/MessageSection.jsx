import { bnpaMessages } from '@/Data/DataForHome';
import React from 'react';

// This is the data structure you should update in your @/Data/DataForHome file


export default function MessageSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        Messages from BNPA
                    </h2>
                    <div className="h-1 w-12 bg-[#26bba4] mx-auto mt-2" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {bnpaMessages.map((m) => (
                        <div
                            key={m.id}
                            className={`relative p-8 md:p-10 rounded-lg shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 ${m.highlight
                                    ? "bg-[#26bba4] text-white" // Switched to your brand teal for consistency
                                    : "bg-slate-50 text-slate-700 border border-slate-100"
                                }`}
                        >
                            {/* Message Text */}
                            <p className="text-base md:text-lg leading-relaxed mb-8 italic">
                                "{m.text}"
                            </p>

                            {/* Profile Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={m.image}
                                    alt={m.name}
                                    className="w-16 h-16 rounded-full border-2 border-white/50 object-cover"
                                />
                                <div>
                                    <h4 className={`font-bold text-lg ${m.highlight ? "text-white" : "text-slate-900"}`}>
                                        {m.name}
                                    </h4>
                                    <p className={`text-sm ${m.highlight ? "text-teal-50" : "text-[#26bba4] font-medium"}`}>
                                        {m.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}