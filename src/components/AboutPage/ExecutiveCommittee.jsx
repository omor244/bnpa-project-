import { committee } from '@/Data/Data';
import React from 'react';
import { CommitteeCard } from '../Card/CommitteeCard';




export default function ExecutiveCommittee() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-24">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        BASSA Executive Committee Members 2022 – 2024
                    </h2>
                    <div className="h-1.5 w-24 bg-[#26bba4] mx-auto rounded-full" />
                </div>

                {/* Leadership (President & VP) */}
                <div className="flex flex-wrap justify-center gap-12 mb-20">
                    {committee.leadership.map((person, index) => (
                        <CommitteeCard key={index} {...person} isLarge={true} />
                    ))}
                </div>

                {/* General Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {committee.members.map((person, index) => (
                        <CommitteeCard key={index} {...person} isLarge={false} />
                    ))}
                </div>

            </div>
        </section>
    );
}