import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Image as ImageIcon, FileText, CheckCircle2, X } from 'lucide-react';
import { handleImageChange } from '@/Data/MembershipData'; // Using your existing helper
import { Imageupload } from '@/lib/utils'; // Using your existing helper
import { Toast } from '@/Data/Data'; // Using your existing Toast
import axios from 'axios';

const UploadGalleryForm = () => {
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Custom preview handler for Multiple Images
    const handleMultiplePreview = (e) => {
        const files = Array.from(e.target.files);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const { title, description, images } = data || {};

        try {
            // --- STEP 1: UPLOAD ALL IMAGES ---
            // Assuming your Imageupload helper handles one file at a time
            const uploadPromises = Array.from(images).map(file => Imageupload(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            const galleryData = {
                title,
                description,
                images: uploadedUrls // Array of secure URLs
            };

       
            console.log(galleryData)
            // --- STEP 2: SAVE TO DATABASE ---
            const res = await axios.post("https://bnpa-mysql.vercel.app/upload-gallery", galleryData);
                
         
            if (res.data.success) {
                Toast.fire({
                    icon: 'success',
                    title: 'Gallery Published!',
                    text: 'Your new gallery item is now live.',
                    background: '#ffffff',
                    iconColor: '#26bba4',
                });
                reset();
                setPreviews([]);
            }
        } catch (error) {
            console.error("Gallery Upload Error:", error);
            Toast.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Could not save gallery. Please check your connection.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                    {/* Header - Matching Membership Style */}
                    <div className="bg-[#26bba4] p-8 text-white text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-tight flex items-center justify-center gap-3">
                            <ImageIcon size={32} /> Add New Gallery
                        </h2>
                        <p className="opacity-90 mt-2 font-light">Showcase events and highlights to the community</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">

                        {/* Section 1: Gallery Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <ImageIcon size={16} className="text-[#26bba4]" /> Gallery Title
                                </label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="e.g. Annual Philatelic Exhibition 2026"
                                />
                                {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-[#26bba4]" /> Description
                                </label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    rows="10"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="Provide details about this gallery..."
                                />
                                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                            </div>
                        </div>

                        {/* Section 2: Multi-Image Upload */}
                        <div className="space-y-4 pt-4">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Upload size={16} className="text-[#26bba4]" /> Select Images <sup>(Multiple)</sup>
                            </label>

                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all relative overflow-hidden group">
                                <Upload className="text-slate-400 group-hover:text-[#26bba4] mb-2 transition-colors" size={40} />
                                <span className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</span>
                                <span className="text-xs text-slate-400 mt-1">Upload up to 10 images (Max 5MB each)</span>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    {...register("images", {
                                        required: "At least one image is required",
                                        onChange: handleMultiplePreview
                                    })}
                                />
                            </div>
                            {errors.images && <span className="text-red-500 text-xs">{errors.images.message}</span>}

                            {/* Multiple Image Previews */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    {previews.map((src, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform">
                                            <img src={src} alt="preview" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#26bba4] cursor-pointer text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1f9d8a] transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <CheckCircle2 size={22} />
                            )}
                            {loading ? 'Processing Gallery...' : 'Publish to Gallery'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UploadGalleryForm;