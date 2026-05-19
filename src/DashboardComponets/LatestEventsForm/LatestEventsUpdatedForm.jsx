import { Type, Layers, Calendar, AlignLeft, Image as ImageIcon, Upload, PlusCircle, Send, X } from "lucide-react";

const LatestEventsUpdatedForm = ({
    onSubmit,
    handleGalleryChange,
    handleThumbnailChange,
    handleSubmit,
    register,
    thumbnailPreview, 
    galleryPreviews,
    loading
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Data Entry */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-3 uppercase tracking-tighter">
                                    <Type size={14} className="text-[#26bba4]" /> Title
                                </label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#26bba4]/5 focus:border-[#26bba4] outline-none transition-all"
                                    placeholder="Event heading..."
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-3 uppercase tracking-tighter">
                                    <Layers size={14} className="text-[#26bba4]" /> Type
                                </label>
                                <select
                                    {...register("type")}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none appearance-none cursor-pointer"
                                >
                                    <option value="news">Latest News</option>
                                    <option value="event">Major Event</option>
                                    <option value="announcement">Announcement</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-3 uppercase tracking-tighter">
                                <Calendar size={14} className="text-[#26bba4]" /> Publication Date
                            </label>
                            <input
                                {...register("date", { required: true })}
                                type="date"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-3 uppercase tracking-tighter">
                                <AlignLeft size={14} className="text-[#26bba4]" /> Event Description
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                rows="8"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none resize-none"
                                placeholder="Provide detailed information..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Media */}
                <div className="lg:col-span-5 space-y-6">
                    {/* MAIN THUMBNAIL WITH PREVIEW */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-4 uppercase tracking-tighter">
                            <ImageIcon size={14} className="text-[#26bba4]" /> Main Thumbnail
                        </label>

                        {/* Preview Box */}
                        {thumbnailPreview ? (
                            <div className="relative mb-4 group rounded-2xl overflow-hidden border border-slate-100 shadow-md h-48">
                                <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full group-hover:scale-110 transition-transform duration-700 h-full object-cover" />
                              
                            </div>
                        ) : null}

                        <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-[#26bba4] transition-all group cursor-pointer text-center bg-slate-50/50">
                            <input
                                {...register("thumbnail")}
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange} // New: Trigger preview update
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="p-3 bg-white rounded-xl inline-block mb-2 group-hover:scale-110 transition-transform shadow-sm">
                                <Upload className="text-[#26bba4]" size={20} />
                            </div>
                            <p className="text-sm font-bold text-slate-600">
                                {thumbnailPreview ? "Change Primary Image" : "Upload Primary Image"}
                            </p>
                        </div>
                    </div>

                    {/* GALLERY WITH PREVIEW */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-4 uppercase tracking-tighter">
                            <PlusCircle size={14} className="text-[#26bba4]" /> Gallery (Multi-Upload)
                        </label>
                        <div className="relative border-2 border-dashed border-[#26bba4]/20 rounded-2xl p-6 text-center bg-[#26bba4]/5 hover:bg-[#26bba4]/10 transition-all cursor-pointer">
                            <input
                                {...register("gallery")}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleGalleryChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <p className="text-sm font-bold text-[#26bba4]">Add More Photos</p>
                        </div>

                        {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {galleryPreviews.map((url, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm group relative">
                                        <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#0f172a] text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#26bba4] transition-all duration-300 active:scale-95 shadow-xl shadow-slate-900/10 disabled:bg-slate-400"
                    >
                        {loading ? "SAVING CHANGES..." : <> <Send size={20} /> UPDATE CONTENT </>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LatestEventsUpdatedForm;