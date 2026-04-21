import { Calendar,  CheckCircle2 } from "lucide-react";


export default function BDPostIssueCard({ item }) {


    if (!item) return null;

  

    return (
        <div className="w-full h-full">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">

                {/* 1. TOP SECTION: Title and Date */}
                <div className="p-6 pb-4">
                    <div className="min-h-[60px]">
                        <h2 className="text-xl font-black text-slate-800 leading-tight">
                            {item.title}
                        </h2>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2 font-bold uppercase tracking-wider">
                            <Calendar size={12} className="text-[#26bba4]" />
                            <span>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* 2. MIDDLE SECTION: Image (Perfectly Centered & Responsive) */}
                <div className="px-6">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 h-64 flex items-center justify-center">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="max-w-[400px] w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Decorative Badge since there is no link */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-slate-100">
                            <CheckCircle2 size={16} className="text-[#26bba4]" />
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM SECTION: Description and Reference */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Copyable Reference ID */}
                   
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {item.description}
                    </p>

                    {/* Footer: Project Identity */}
             
                </div>
            </div>
        </div>
    );
}