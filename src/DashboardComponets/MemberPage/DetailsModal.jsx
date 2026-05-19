
import { Mail, X, MapPin, Phone, Bookmark, Target, BadgeCheck } from "lucide-react";

const DetailsModal = ({ setSelectedMember, selectedMember }) => {
    // Determine status color/icon
    const isApproved = selectedMember.status === "approved";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden transform transition-all scale-100 animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-6 right-6 p-2.5 bg-white/80 backdrop-blur-sm text-slate-500 rounded-full hover:bg-red-50 hover:text-red-600 hover:rotate-90 transition-all z-10 shadow-sm"
                >
                    <X size={20} strokeWidth={3} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Profile Hero Section */}
                    <div className="w-full md:w-2/5 bg-slate-100 p-10 flex flex-col items-center justify-center border-r border-slate-100 relative overflow-hidden">

                        {/* Decorative background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#26bba4]/10 to-slate-100/50 z-0"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <img
                                src={selectedMember.profileImage}
                                alt={selectedMember.fullName}
                                className="w-40 h-40 rounded-3xl object-cover border-8 border-white shadow-2xl mb-5 transform hover:scale-105 transition-transform"
                            />

                            <h3 className="font-black text-slate-900 text-xl text-center uppercase tracking-tight max-w-[200px] leading-tight">
                                {selectedMember.fullName}
                            </h3>

                            <p className="text-xs font-bold text-[#26bba4] bg-[#26bba4]/10 px-4 py-1 rounded-full mt-2 uppercase tracking-wider">
                                {selectedMember.memberType}
                            </p>

                            {/* Animated Status Badge */}
                            <div className={`flex items-center gap-2 mt-6 px-5 py-2 rounded-xl text-xs font-black uppercase shadow-inner ${isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                <div className={`w-2.5 h-2.5 rounded-full ${isApproved ? 'bg-green-500 animate-pulse' : 'bg-orange-500 animate-pulse'}`}></div>
                                Status: {selectedMember.status}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Detailed Information Grid */}
                    <div className="w-full md:w-3/5 p-10 space-y-6 bg-white relative">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <Target size={18} className="text-[#26bba4]" />
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                Comprehensive Verification Data
                            </h4>
                        </div>

                        {/* Info Cards Grid */}
                        <div className=" text-sm">

                            {/* Card: Email */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#26bba4]/20 transition-all">
                                <div className="p-2.5 bg-[#26bba4]/10 text-[#26bba4] rounded-xl"><Mail size={18} /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Email Address</p>
                                    <p className="font-bold text-slate-800 break-all">{selectedMember.email}</p>
                                </div>
                            </div>

                            {/* Card: Mobile */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#26bba4]/20 transition-all">
                                <div className="p-2.5 bg-[#26bba4]/10 text-[#26bba4] rounded-xl"><Phone size={18} /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Mobile Phone</p>
                                    <p className="font-bold text-slate-800">{selectedMember.mobile}</p>
                                </div>
                            </div>

                            {/* Card: NID */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#26bba4]/20 transition-all">
                                <div className="p-2.5 bg-[#26bba4]/10 text-[#26bba4] rounded-xl"><Bookmark size={18} /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">NID / ID Document</p>
                                    <p className="font-bold text-slate-800 font-mono tracking-tight">{selectedMember.nid}</p>
                                </div>
                            </div>

                            {/* Card: Address */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#26bba4]/20 transition-all col-span-1 sm:col-span-2">
                                <div className="p-2.5 bg-[#26bba4]/10 text-[#26bba4] rounded-xl"><MapPin size={18} /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Postal Address</p>
                                    <p className="font-bold text-slate-700 leading-relaxed text-xs">{selectedMember.address}</p>
                                </div>
                            </div>

                        </div>

                        {/* Document Verification Section */}
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                                    <BadgeCheck size={14} className="text-green-500" /> Uploaded Document / Membership Card
                                </p>
                                {/* <button onClick={() => window.open(selectedMember.cardImage, '_blank')} className="text-[#26bba4] text-[10px] font-bold hover:underline">
                                    Open Full Image
                                </button> */}
                            </div>
                            <div className="relative group">
                                <img
                                    src={selectedMember.cardImage}
                                    alt="Membership Card"
                                    className="w-full h-full object-cover rounded-2xl border-4 border-dashed border-slate-100 bg-slate-50 group-hover:border-[#26bba4]/30 transition-all shadow-inner"
                                />
                                <div className="absolute inset-0 bg-black/5 rounded-2xl group-hover:bg-transparent transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;