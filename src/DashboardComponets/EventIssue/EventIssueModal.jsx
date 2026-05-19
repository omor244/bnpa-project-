import { Type, Calendar, Upload, Image as ImageIcon, AlignLeft, Send, X } from "lucide-react";

const EventIssueModal = ({handleSubmit, onSubmit, register, errors, editingItem, isUpdating}) => {
    return (
        <div>
            <dialog id="update_modal" className="modal max-w-11/12xl mx-auto mt-12">
                <div className="modal-box p-0 bg-transparent shadow-none border-none max-w-4xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-6 relative">
                        {/* Close Modal */}
                        <button
                            type="button"
                            onClick={() => document.getElementById('update_modal').close()}
                            className="absolute top-8 right-8 p-2.5 bg-slate-100 text-slate-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-4">
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Update <span className="text-[#26bba4]">Event Issue</span></h3>
                            <p className="text-slate-400 text-sm">Modify the details below to update the live content.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest"><Type size={14} className="text-[#26bba4]" /> Title</label>
                                <input {...register("title", { required: "Title is required" })} type="text" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#26bba4] outline-none bg-slate-50/50 transition-all" />
                                {errors.title && <p className="text-red-500 text-[10px] mt-1 font-bold tracking-wide">{errors.title.message}</p>}
                            </div>

                            {/* Date */}
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest"><Calendar size={14} className="text-[#26bba4]" /> Date</label>
                                <input {...register("date", { required: "Date is required" })} type="date" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#26bba4] outline-none bg-slate-50/50 transition-all" />
                                {errors.date && <p className="text-red-500 text-[10px] mt-1 font-bold tracking-wide">{errors.date.message}</p>}
                            </div>
                        </div>

                        {/* File Upload & Current Image Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            {/* New Upload */}
                            <div className="flex-1">
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest"><Upload size={14} className="text-[#26bba4]" /> Update Image (Optional)</label>
                                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-slate-50 transition-all text-center group cursor-pointer">
                                    <input {...register("image")} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="flex flex-col items-center">
                                        <ImageIcon className="text-[#26bba4] mb-2 group-hover:scale-110 transition-transform" size={24} />
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Click or Drag to replace</p>
                                    </div>
                                </div>
                            </div>

                            {/* Existing Preview */}
                            <div className="flex flex-col">
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Current Image</label>
                                <div className="h-[108px] w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group shadow-inner">
                                    {editingItem?.image ? (
                                        <>
                                            <img
                                                src={editingItem.image}
                                                alt="Current Preview"
                                                className="w-full h-full  object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                         
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-1 italic">
                                            <X size={16} />
                                            <span className="text-[10px] font-bold uppercase">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest"><AlignLeft size={14} className="text-[#26bba4]" /> Description</label>
                            <textarea {...register("description", { required: "Description is required" })} rows="4" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#26bba4] outline-none bg-slate-50/50 resize-none transition-all"></textarea>
                            {errors.description && <p className="text-red-500 text-[10px] mt-1 font-bold tracking-wide">{errors.description.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={isUpdating}
                            type="submit"
                            className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#26bba4] hover:shadow-2xl hover:shadow-[#26bba4]/20 transition-all shadow-xl disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? (
                                <span className="animate-pulse">Processing Update...</span>
                            ) : (
                                <><Send size={16} /> Save & Update Content</>
                            )}
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default EventIssueModal;