import { committeeMembers } from '@/Data/Data';
import React from 'react';







export default function ExecutiveCommittee() {

    return (
        <section className="py-20  min-h-screen  ">
            <div className="max-w-[1300px] mx-auto px-4">


                {/* --- DYNAMIC GRID SYSTEM --- */}
                <div className="flex  flex-col items-center space-y-24 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 shadow-[#26bba4] hover:shadow-2xl transition-shadow">
                    <h3 className="text-3xl md:text-5xl font-semibold text-center text-slate-900 mb-24">Organizing Committee 2025 - 2027 </h3>

                    {committeeMembers.map((row, index) => (
                        <div
                            key={index}
                            className={`lg:grid ${row.cols}  gap-x-8 gap-y-12 w-full max-w-fit items-start justify-items-center`}
                        >
                            {row.members.map((member, mIdx) => (
                                <div key={mIdx} className="flex flex-col items-center text-center ">

                                    <div className={`
                relative w-48 h-48 rounded-full  overflow-hidden  border-2 p-1
                    ${row.role === 'chief_patron' || row.role === 'president' ? 'border-[#26bba4] scale-110 ' : 'border-slate-200'}
                  `}>
                                        <img src={member.image} alt={member.name} className="w-full hover:scale-110 transition-transform duration-700 h-full object-cover rounded-full" />
                                    </div>

                                    <div className="mt-4 space-y-1 mb-8 ">
                                        <h4 className={`text-sm leading-tight text-slate-900 ${row.role === 'chief_patron' || row.role === 'president' ? 'font-black' : 'font-bold'}`}>
                                            {member.name}
                                        </h4>
                                        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tighter">
                                            {member.designation}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}