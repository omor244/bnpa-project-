import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../LoadingPage/LoadingPage';

export default function WelcomeSection() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const { data } = await axios.get("https://bnpa-backend.vercel.app/new-issue");
            return data;
        }
    });

    if (isLoading) return <LoadingPage />;

    // Get only the first item (the most recent one after sorting in backend)
    const item = response && response.length > 0 ? response[0] : null;

    if (!item) return null;

    return (
        <section className="relative py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-8">
                       

                        <div className="relative inline-block">
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-10 leading-tight">
                                Welcome to <span className="text-[#26bba4]">BNPA</span>
                            </h2>
                           
                        </div>

                        <p className="text-xl text-slate-500 font-semibold">
                            Bangladesh National Philatelic Association
                        </p>

                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed max-w-xl">
                            <p>
                                A non-political, non-profit socio-cultural organization. Since our inception,
                                we have become an integral part of the community, promoting <span className="font-bold text-slate-900 border-b-2 border-slate-900">educational welfare</span> through the study of postage stamps.
                            </p>
                            <p>
                                For over four decades, BNPA has fostered a deep appreciation for history and heritage,
                                connecting collectors within and outside the Bangladeshi community.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <button className="px-10 py-4 bg-[#0f172a] text-white rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                View Archive <ArrowRight size={18} />
                            </button>
                            <button className="px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                                Our Story
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-1/2 text-center">
                        <div className="mb-6">
                            <h2 className="text-6xl md:text-7xl font-black my-4 text-slate-900">
                                Recent <span className="text-[#26bba4]">Issue</span>
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl">
                            {/* Fixed Height Container with Flex Centering */}
                            <div className="relative group p-4 h-[350px] flex justify-center items-center bg-slate-50 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    // 'max-h-full' ensures it hits the 400px limit
                                    // 'w-auto' maintains the correct aspect ratio
                                    // 'object-cover' or 'object-contain' depending on your preference
                                    className="max-h-full w-full object-contain rounded-lg shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="mt-8 space-y-2">
                                <p className="text-lg md:text-xl font-bold text-slate-800">
                                    Title : <span className="text-slate-600 font-normal">{item.title}</span>,
                                    Date of Issue : <span className="text-slate-600 font-normal">{item.dateOfIssue}</span>
                                </p>
                                <p className="text-lg md:text-xl font-bold text-slate-800">
                                    Designer : <span className="text-slate-600 font-normal">{item.designer}</span>,
                                    Number of Postmark : <span className="text-slate-600 font-normal">{item.postmarkNumber}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}