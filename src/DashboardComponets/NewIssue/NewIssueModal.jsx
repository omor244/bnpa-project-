import { Type, Calendar, Image as ImageIcon, User, X, Upload, Layers, Ruler, Grid2X2, Hash, Printer, Palette, Grid3X3 } from "lucide-react";

const NewIssueModal = ({ handleImageChange, handleSubmit, onSubmit, selectedIssue, register, fileInputRef, imagePreview, isUploading, updateMutation }) => {
    return (
        <div>
            <dialog id="edit_issue_modal" className="modal modal-middle rounded-[3rem] mx-auto mt-6 scrollbar-hide">
                <div className="modal-box p-0 max-w-[75rem] w-11/12 shadow-2xl border-none">
                    <div className="p-8 lg:p-14 relative bg-white">

                        <button
                            type="button"
                            onClick={() => document.getElementById('edit_issue_modal').close()}
                            className="absolute top-8 right-8 p-3 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:rotate-90 transition-all z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-10 text-left">
                            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
                                Update <span className="text-[#26bba4]">Existing Issue</span>
                            </h2>
                            <p className="text-slate-400 font-medium text-sm mt-1">
                                Modifying: <span className="text-[#26bba4] font-bold">{selectedIssue?.title}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">

                            {/* LEFT SIDE: FIELDS */}
                            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">

                                {/* Row: Title */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Type size={14} className="text-[#26bba4]" /> Title
                                    </label>
                                    <input {...register("title")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Calendar size={14} className="text-[#26bba4]" /> Date of Issue
                                        </label>
                                        <input type="date" {...register("dateOfIssue")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Type size={14} className="text-[#26bba4]" />   Number of Stamps
                                        </label>
                                        <input {...register("numStamps")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Face Value */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Layers size={14} className="text-[#26bba4]" /> Face Value (BDT)
                                        </label>
                                        <input {...register("faceValue")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Type size={14} className="text-[#26bba4]" /> postmark
                                        </label>
                                        <input {...register("postmarkNumber")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Size */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Ruler size={14} className="text-[#26bba4]" /> Size
                                        </label>
                                        <input {...register("size")} placeholder="e.g. 30mm x 40mm" className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    {/* Perforation */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Grid2X2 size={14} className="text-[#26bba4]" /> Perforation
                                        </label>
                                        <input {...register("perforation")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Quantity */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Hash size={14} className="text-[#26bba4]" /> Total Quantity
                                        </label>
                                        <input {...register("quantity")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    {/* Stamps Per Sheet */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Grid3X3 size={14} className="text-[#26bba4]" /> Number of Stamps In Each Sheet
                                        </label>
                                        <input {...register("NumberofStampEachSheet")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Color */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Palette size={14} className="text-[#26bba4]" /> Color
                                        </label>
                                        <input {...register("color")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    {/* Printing Process */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Printer size={14} className="text-[#26bba4]" /> Printing Process
                                        </label>
                                        <input {...register("processPrinting")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Printers */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Printer size={14} className="text-[#26bba4]" /> Printers
                                        </label>
                                        <input {...register("printers")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>

                                    {/* Designer */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <User size={14} className="text-[#26bba4]" /> Designer
                                        </label>
                                        <input {...register("designer")} className="w-full px-5 py-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#26bba4]/20 outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: IMAGE & SUBMIT */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <ImageIcon size={14} className="text-[#26bba4]" /> Main Thumbnail
                                    </label>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    <div
                                        onClick={() => !isUploading && fileInputRef.current.click()}
                                        className="border-2 border-dashed rounded-[2rem] min-h-[280px] flex items-center justify-center cursor-pointer hover:border-[#26bba4] transition-colors bg-slate-50 overflow-hidden"
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-64 object-contain p-4" alt="Preview" />
                                        ) : (
                                            <div className="text-center">
                                                <Upload className="text-[#26bba4] mx-auto mb-2" size={32} />
                                                <p className="text-xs font-bold text-slate-400 uppercase">Upload Stamp Image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUploading || updateMutation.isPending}
                                    className="w-full py-6 rounded-[2rem] font-black text-lg bg-[#0f172a] text-white hover:bg-[#26bba4] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? "PROCESSING..." : "UPDATE CONTENT"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default NewIssueModal;