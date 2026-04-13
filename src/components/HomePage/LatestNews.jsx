import { newsItems } from '@/Data/DataForHome';
import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router';



export default function LatestNews() {

    const location = useLocation()


    return (
        <section className="py-16 lg:px-18  bg-white">
            <div className="container mx-auto lg:px-6">
          
                {/* Section Heading */}
                {location.pathname !== "/news" && <>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Latest Events & News
                        </h2>
                        <div className="h-1 w-16 bg-[#26bba4] mx-auto" />
                    </div>
                </>} 

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {newsItems.map((item) => (
                        <div key={item.id} className="flex flex-col group">

                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden mb-4 border border-slate-100 shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-medium uppercase tracking-wider">
                                <Calendar size={14} className="text-[#26bba4]" />
                                <span>{item.date}</span>
                                <span>/</span>
                                <span className="text-slate-500">{item.category}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight min-h-[56px] line-clamp-2 group-hover:text-[#26bba4] transition-colors">
                                {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                {item.excerpt}
                            </p>

                            {/* Read More Button */}
                            <div className="mt-auto">
                                <button className="bg-[#4a4a4a] text-white text-xs font-bold py-2.5 px-5 hover:bg-[#26bba4] transition-colors duration-300 uppercase tracking-wide rounded-sm shadow-sm">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}