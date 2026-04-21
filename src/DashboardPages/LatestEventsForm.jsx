import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Upload,
    Calendar,
    Type,
    AlignLeft,
    Send,
    Image as ImageIcon,
    Layers,
    X,
    PlusCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Imageupload } from '@/lib/utils';
import axios from 'axios';

export default function LatestEventsForm() {
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [loading, setloading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, 
    } = useForm();

    // Handle the visual preview for multiple images
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...filePreviews].slice(0, 10)); // Limit to 10
    };

    const onSubmit = async (data) => {
        try {
            // 1. Upload the single Thumbnail
            setloading(true)
            const uploadthum = await Imageupload(data.thumbnail[0]);

            // 2. Upload multiple Gallery images
            const galleryFiles = Array.from(data.gallery);

            // We use Promise.all to upload all images at the same time
            const uploadGallery = await Promise.all(
                galleryFiles.map(file => Imageupload(file))
            );

         
            const payload = {
                ...data,
                thumbnail: uploadthum, 
                gallery: uploadGallery  
            };

         
             
            const res = await axios.post("https://bnpa-mysql.vercel.app/latest-events", payload)
            console.log("CIT Submission Payload:", payload);
              
            console.log(res.data)
            if (res.data.success) {
                 setloading(false)
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Event Published Successfully',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#ffffff',
                    color: '#0f172a',
                    iconColor: '#26bba4'
                });
    
                reset();
                setGalleryPreviews([]);
            }
         

        } catch (error) {
            console.error("Upload failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'There was an error uploading your images.',
            });
        }
    };

    return (
        <section className="py-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Branding Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                            Latest Events <span className="text-[#26bba4]">& News</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">Creators Information Technologies Control Panel</p>
                    </div>
                    <div className="px-5 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-3 h-3 bg-[#26bba4] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Live Server v2.0</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Data Entry (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">

                            {/* Title & Type */}
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

                            {/* Date Input */}
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

                            {/* Description */}
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

                    {/* RIGHT COLUMN: Media (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Main Thumbnail */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 mb-4 uppercase tracking-tighter">
                                <ImageIcon size={14} className="text-[#26bba4]" /> Main Thumbnail
                            </label>
                            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-[#26bba4] transition-all group cursor-pointer text-center">
                                <input
                                    {...register("thumbnail", { required: true })}
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-2 group-hover:scale-110 transition-transform">
                                    <Upload className="text-slate-400" size={20} />
                                </div>
                                <p className="text-sm font-bold text-slate-600">Primary Image</p>
                            </div>
                        </div>

                        {/* Multi-Image Gallery */}
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
                                <p className="text-sm font-bold text-[#26bba4]">Add Multiple Photos</p>
                            </div>

                            {/* Gallery Preview Grid */}
                            {galleryPreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {galleryPreviews.map((url, i) => (
                                        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                                            <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-5 bg-[#0f172a] text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#26bba4] transition-all duration-300 active:scale-95 shadow-xl shadow-slate-900/10"
                        >
                            {loading  ? "Loading..." : <> <Send size={20} /> PUBLISH CONTENT </> }  
                        </button>
                    </div>

                </form>

                <p className="mt-12 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
                    Creators Information Technologies © 2026
                </p>
            </div>
        </section>
    );
}