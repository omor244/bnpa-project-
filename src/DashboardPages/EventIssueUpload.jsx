import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Calendar, Type, AlignLeft, Send, Image as ImageIcon } from 'lucide-react';
import { Imageupload } from '@/lib/utils';
import axios from 'axios';
import { Toast } from '@/Data/Data';

export default function EventIssueUpload() {

    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        // Simple manual image extraction
        const imageFile = data.image[0]
        const uploadedimage = await Imageupload(imageFile)
        const finalData = {
            ...data,
            image: uploadedimage
        };
            
        console.log(finalData)

        const res = await axios.post("https://bnpa-mysql.vercel.app/events-issue", finalData)
          console.log(res.data)
        if (res.data.insertedId) {
            
            Toast.fire({
                icon: 'success',
                title: 'Issue Published!',
                text: 'Events issue have been submitted.',
                background: '#ffffff',
                iconColor: '#26bba4',
                confirmButtonColor: '#0f172a',
                buttonsStyling: true,
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'px-8 py-3 rounded-xl font-bold uppercase tracking-tight'
                }
            });
        }
        console.log("Final Data for Submission:", finalData);
        reset();
    };

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="max-w-3xl mx-auto">

                    {/* Header Design */}
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-black text-slate-900 leading-tight">
                            Bangladesh post issue on <span className="text-[#26bba4]">BNPA events</span>
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium italic">Official Document Upload Portal</p>
                    </div>

                    {/* Main Form Section */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8"
                    >

                        {/* Title Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                <Type size={16} className="text-[#26bba4]" /> Title
                            </label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                placeholder="Enter Issue Title"
                                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#26bba4]/10 focus:border-[#26bba4] outline-none transition-all bg-slate-50/50"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-2 ml-2 font-semibold">⚠ {errors.title.message}</p>}
                        </div>

                        {/* Date Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                <Calendar size={16} className="text-[#26bba4]" /> Date
                            </label>
                            <input
                                {...register("date", { required: "Date is required" })}
                                type="date"
                                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#26bba4]/10 focus:border-[#26bba4] outline-none transition-all bg-slate-50/50 text-slate-600"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-2 ml-2 font-semibold">⚠ {errors.date.message}</p>}
                        </div>

                        {/* File Upload Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                <Upload size={16} className="text-[#26bba4]" /> Image UPLOAD
                            </label>
                            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-[#26bba4] hover:bg-[#26bba4]/5 transition-all group cursor-pointer text-center">
                                <input
                                    {...register("image", { required: "Please select a stamp image" })}
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-100">
                                        <ImageIcon className="text-[#26bba4]" size={32} />
                                    </div>
                                    <p className="text-sm text-slate-600 font-bold">Click to upload stamp image</p>
                                    <p className="text-xs text-slate-400 mt-1">High-resolution JPEG or PNG</p>
                                </div>
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-2 ml-2 font-semibold">⚠ {errors.image.message}</p>}
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                <AlignLeft size={16} className="text-[#26bba4]" /> Description
                            </label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                rows="5"
                                placeholder="Enter details about the post issue..."
                                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#26bba4]/10 focus:border-[#26bba4] outline-none transition-all bg-slate-50/50 resize-none"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-2 ml-2 font-semibold">⚠ {errors.description.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-5 bg-[#0f172a] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20"
                        >
                            <Send size={20} /> Publish to Website
                        </button>

                    </form>

                    <footer className="mt-12 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                            Creators Information Technologies • CIT Internal Systems
                        </p>
                    </footer>

                </div>
            </div>
        </section>
    );
}