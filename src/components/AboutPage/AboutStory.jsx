import React from 'react';

const AboutStory = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Professional Page Header */}
            <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
                        About <span className="text-[#26bba4]">BNPA</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#26bba4] mx-auto rounded-full mb-6" />
                    <p className="max-w-3xl mx-auto text-lg text-slate-600 font-light leading-relaxed">
                        A non-political, non-profit, and non-government national philatelic body
                        dedicated to the promotion of stamp collecting and the study of postal history in Bangladesh.
                    </p>
                </div>
            </div>

            {/* 2. Our Story / Journey Section (Split Layout) */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-[#26bba4] rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition duration-500" />
                                <img
                                    src="https://i.ibb.co.com/39HD0QzM/Whats-App-Image-2026-04-11-at-7-27-46-PM.jpg"
                                    alt="BNPA Historic Gathering"
                                    className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
                                />
                                {/* Overlay badge for legacy */}
                                <div className="absolute -bottom-6 -right-6 bg-[#26bba4] text-white p-6 rounded-xl shadow-2xl hidden md:block text-center">
                                    <p className="text-3xl font-black">1978</p>
                                    <p className="text-xs uppercase font-bold tracking-widest">Est. Since</p>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900">The Journey of BNPA</h2>
                            <div className="h-1 w-16 bg-[#26bba4]" />

                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    A good number of philatelists, stamp collectors and enthusiasts of Bangladesh in a meeting held in Dhaka city on July 23, 1978, formed a National Philatelic body, under the style of Bangladesh National Philatelic Association (BNPA).
                                </p>
                                <p>
                                    The Association aims at the promotion of philately in the country through its various activities. It is a non-political, non-profit and non-government organization.
                                </p>
                                <p>
                                    The first full-fledged executive committee of the BNPA was elected unanimously in a meeting held on July 30, 1978. Mr. Zakiuddin Ahmed was elected as President when Mr. Kazi Shariful Alam was elected as General Secretary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

      
         
        </main>
    );
};

export default AboutStory;