import React from 'react';
import { Calendar, ArrowRight, Layers, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';

export default function EventCard({ item }) {
    // Helper to format the date nicely
    const formattedDate = new Date(item.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div key={item._id} className="flex flex-col group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f172a] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                    {item.type}
                </div>

                {/* Gallery Indicator - Shows if there are multiple images */}
                {item.gallery?.length > 0 && (
                    <div className="absolute bottom-4 right-4 bg-[#26bba4] text-white p-2 rounded-xl shadow-lg flex items-center gap-1.5">
                        <ImageIcon size={14} />
                        <span className="text-[10px] font-bold">+{item.gallery.length}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 lg:p-8 flex flex-col flex-grow">

                {/* Metadata Row */}
                <div className="flex items-center gap-3 text-slate-400 text-[11px] mb-4 font-bold uppercase tracking-[0.15em]">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#26bba4]" />
                        <span>{formattedDate}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-500">CIT Official</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-slate-800 mb-3 leading-tight line-clamp-2 group-hover:text-[#26bba4] transition-colors duration-300">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {item.description}
                </p>

                {/* Action Row */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <Link to={`/news/${item.id}`} className="flex items-center gap-2 text-[#0f172a] hover:text-[#26bba4] font-black text-xs uppercase tracking-widest transition-all group/btn">
                        View Details
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    {/* Tiny decorative branding */}
                    <Layers size={16} className="text-slate-100 group-hover:text-[#26bba4]/20 transition-colors" />
                </div>
            </div>
        </div>
    );
}