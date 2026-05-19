import React from 'react';
import { ArrowRight, Info, Banknote, Printer, Layers } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../LoadingPage/LoadingPage';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export default function WelcomeSection() {
    const axiosSecure = useAxiosSecure()
    const { data: response, isLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const { data } = await axios("https://api.bnpa.bd/new-issue-get");
            
            return data;
        }
    });


    if (isLoading) return <LoadingPage />;



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
                    <div className="w-full lg:w-1/2 rounded-lg bg-slate-200 py-2 text-center shadow-sm border border-slate-300">
                        <div className="mb-6">
                            <h2 className="text-5xl md:text-6xl font-black my-4 text-slate-900">
                                Recent <span className="text-[#26bba4]">Issue</span>
                            </h2>
                        </div>

                        <div className="rounded-xl px-4">
                            {/* Image Container */}
                            <div className="relative p-4 h-[320px] flex justify-center items-center bg-white/50 rounded-2xl border border-slate-300/50">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-full w-auto object-contain rounded-lg transition-transform duration-500 hover:scale-[1.03] drop-shadow-md"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="mt-8 space-y-4 text-left max-w-2xl mx-auto pb-6">
                                <div className="space-y-1 text-center border-b border-slate-300 pb-4">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#26bba4] font-bold text-sm tracking-wide">
                                        Date of Issue: {item.dateOfIssue ?
                                            new Date(item.dateOfIssue).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : "N/A"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm">
                                    {/* Column 1: Physical & Quantity */}
                                    <ul className="space-y-2">
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Number of Stamps:</span>
                                            <span className="text-slate-600">{item.numStamps}</span>
                                        </li>
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Face Value:</span>
                                            <span className=" text-slate-600">{item.faceValue || 'N/A'}</span>
                                        </li>
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Postmarks:</span>
                                            <span className="text-slate-600">{item.postmarkNumber || 'N/A'}</span>
                                        </li>
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Size:</span>
                                            <span className="text-slate-600">{item.size}</span>
                                        </li>
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Perforation:</span>
                                            <span className="text-slate-600">{item.perforation || 'N/A'}</span>
                                        </li>


                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Number of Stamps In Each Sheet:</span>
                                            <span className="text-slate-600">{item?.NumberofStampEachSheet || 'N/A'}</span>
                                        </li>
                                    </ul>

                                    {/* Column 2: Production Details */}
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Quantity:</span>
                                            <span className="text-slate-600">{item.quantity || 'N/A'}</span>
                                        </li>
                                        <li className="flex  gap-1">
                                            <span className="font-bold text-black">Color:</span>
                                            <span className="text-slate-600">{item.color || 'N/A'}</span>
                                        </li>
                                        <li className="">
                                            <span className="font-bold text-black ">Printing Process:</span>
                                            <span className="text-slate-600 pl-1">{item.processPrinting || 'N/A'}</span>
                                        </li>
                                        <li>
                                            <div className="flex  gap-1">
                                                <span className="font-bold text-black">Designer:</span>
                                                <span className="text-slate-500 break-all">{item.designer || 'N/A'}</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm ">
                                            <div className="flex  gap-1">

                                                <span className="font-bold text-black">Printer:</span>

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