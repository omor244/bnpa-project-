import React from 'react';
import { ArrowRight, Info, Banknote, Printer, Layers } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../LoadingPage/LoadingPage';

export default function WelcomeSection() {
    const { data: response, isLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const { data } = await axios.get("https://bnpa-mysql.vercel.app/new-issue");
            return data;
        }
    });
    
    console.log(response)
    if (isLoading) return <LoadingPage />;

    // FIXED LOGIC: Ensure response exists and handle both Array or Single Object formats
    const items = Array.isArray(response) ? response : (response ? [response] : []);
    const item = items.length > 0 ? items[0] : null;

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

                    {/* RIGHT CONTENT: RECENT ISSUE */}
                    <div className="w-full lg:w-1/2 rounded-lg bg-slate-200 py-2 text-center">
                        <div className="mb-6">
                            <h2 className="text-6xl md:text-6xl font-black my-4 text-slate-900">
                                Recent <span className="text-[#26bba4]">Issue</span>
                            </h2>
                        </div>

                        <div className=" rounded-xl">
                            {/* Image Container */}
                            <div className="relative  p-4 h-[300px] flex justify-center items-center  rounded-2xl   ">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-full w-full object-contain rounded-lg transition-transform duration-500 hover:scale-[1.03]"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="mt-8 space-y-4 text-left md:text-center max-w-lg mx-auto">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#26bba4] font-bold flex items-center justify-center gap-2">
                                        Released: {item.dateOfIssue}
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 py-4">
                                    {/* Left Column */}
                                    <ul className="flex-1 space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-slate-700">
                                    
                                            <span className="font-semibold">Number of Stamps:</span>
                                            <span className="text-slate-500">{item.numStamps || 'N/A'}</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700">
                                           
                                            <span className="font-semibold">Face Value:</span>
                                            <span className="text-slate-500">{item.faceValue || 'N/A'}</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700">
                                          
                                            <span className="font-semibold">Number of Postmarks:</span>
                                            <span className="text-slate-500">{item.postmarkNumber || 'N/A'}</span>
                                        </li>
                                    </ul>

                                    {/* Right Column */}
                                    <ul className="flex-1 space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-slate-700">

                                            <div className="flex  gap-1">
                                                <span className="font-semibold">Designer:</span>
                                                <span className="text-slate-500 break-all">{item.designer || 'N/A'}</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-slate-700">
                                           
                                            <div className="flex  gap-1">
                                                <span className="font-semibold">Printer:</span>
                                                <span className="text-slate-500 ">{item.printers || 'N/A'} </span>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}