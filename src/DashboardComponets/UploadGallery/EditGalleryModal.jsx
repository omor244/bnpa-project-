import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImageIcon, FileText, Upload, CheckCircle2, X } from "lucide-react";
import { Imageupload } from "@/lib/utils";

const EditGalleryModal = ({ data, onClose }) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    // State to store the URL strings for the <img> src
    const [previewUrls, setPreviewUrls] = useState(data.images || []);

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            title: data.title,
            description: data.description,
        }
    });

    // Handle Image Preview
    const handleImageChange = (e) => {
        const files = Array.from(e.target);
        if (files.length > 0) {
            // Generate temporary URLs for previewing the new images
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(newPreviews);
        }
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const fileList = formData.images; // This is a FileList from react-hook-form
            let uploadedImageUrls = [];

            // 1. Check if the user actually selected new files
            if (fileList && fileList.length > 0) {
                // 2. Map through files and upload them all in parallel
                // We convert FileList to an Array first using Array.from()
                const uploadPromises = Array.from(fileList).map((file) => Imageupload(file));

                // 3. Wait for all uploads to complete
                uploadedImageUrls = await Promise.all(uploadPromises);
            } else {
                // 4. If no new images selected, keep the existing ones
                uploadedImageUrls = previewUrls;
            }

            const updatePayload = {
                title: formData.title,
                description: formData.description,
                images: uploadedImageUrls // This is now a clean array of strings (URLs)
            };

            // console.log("Final Payload:", updatePayload);

            // Send the put request
            await axios.post(`https://api.bnpa.bd/upload-gallery-upload/${data.id}`, updatePayload);

            queryClient.invalidateQueries(['gallery-manage']);
            toast.success("Gallery updated successfully!");
            onClose();
        } catch (error) {
            console.error("Upload/Update Error:", error);
            toast.error("Something went wrong during update");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative no-scrollbar">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                    <X size={20} />
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
                    <h2 className="text-2xl font-black text-slate-800 uppercase">Edit Gallery Item</h2>

                    <div className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <ImageIcon size={16} className="text-[#26bba4]" /> Gallery Title
                            </label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                            />
                            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <FileText size={16} className="text-[#26bba4]" /> Description
                            </label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                            />
                            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="space-y-4 pt-4">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Upload size={16} className="text-[#26bba4]" /> Update Images <sup>(Replaces Current)</sup>
                        </label>

                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all relative overflow-hidden group">
                            <Upload className="text-slate-400 group-hover:text-[#26bba4] mb-2 transition-colors" size={30} />
                            <span className="text-sm text-slate-500 font-medium text-center">Click to upload new images or drag and drop</span>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                {...register("images", {
                                    onChange: (e) => handleImageChange(e)
                                })}
                            />
                        </div>

                        {/* Preview Display */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                {previewUrls.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform">
                                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#26bba4] cursor-pointer text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1f9d8a] transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <CheckCircle2 size={22} />}
                        {loading ? 'Processing...' : 'Update Gallery Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditGalleryModal;