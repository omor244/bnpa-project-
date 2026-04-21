import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, Tag, Share2, ArrowLeft, Clock, MapPin } from 'lucide-react';

const NewsEventDetails = () => {
    const { id } = useParams();
      
  
    const { data: newsItemsdetails, isLoading } = useQuery({
        queryKey: ['newsItemsDetails', id],
        queryFn: async () => {
          
            const { data } = await axios.get(`https://bnpa-mysql.vercel.app/latest-events/${id}`);
            return data;
        }
    });


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26bba4]"></div>
            </div>
        );
    }
     
    

    const item = newsItemsdetails ||  {};

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* 1. Header Navigation */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/news" className="flex items-center gap-2 text-slate-500 hover:text-[#26bba4] transition-colors font-semibold text-sm">
                        <ArrowLeft size={18} />
                        Back to Events
                    </Link>
                    <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-4 pt-8">
                {/* 2. Category & Title Area */}
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#26bba4]/10 text-[#26bba4] text-xs font-bold uppercase tracking-widest mb-4">
                        Official News
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                        {item?.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-500 border-b border-slate-100 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-[#26bba4]" />
                            <span className="text-sm font-medium">
                                {new Date(item?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                       
                    </div>
                </div>

                {/* 3. Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 shadow-slate-200">
                    <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="w-full aspect-[16/9] object-cover"
                    />
                </div>

                {/* 4. Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-slate prose-lg max-w-none">
                            <p className="text-xl text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#26bba4] first-letter:mr-3 first-letter:float-left">
                                {item?.description}
                            </p>

                            {/* <div className="mt-8 space-y-4 text-slate-600">
                                <p>This event marks a significant milestone in our ongoing philatelic journey. Participants will have the opportunity to engage with experts and view exclusive collections not seen elsewhere.</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Event Highlights</h3>
                               
                            </div> */}
                        </div>
                    </div>

                 
                </div>
            </article>
        </div>
    );
};

export default NewsEventDetails;