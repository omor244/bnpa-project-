import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, CheckCircle2 } from "lucide-react";
import { Imageupload } from "@/lib/utils";
import { Toast } from "@/Data/Data";

const EditProductModal = ({ data, onClose }) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

   
    const [preview, setPreview] = useState(data.photo);
    const [multiplePreviews, setMultiplePreviews] = useState(

        typeof data.multipleimage === 'string' ? JSON.parse(data.multipleimage || "[]") : (data.multipleimage || [])

    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            condition: data.con,
        }
    });


    const renderImage = (img) => {
        if (img instanceof File) {
            return URL.createObjectURL(img);
        }
        return img;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setPreview(file);
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
   
        setMultiplePreviews(files);
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            // 1. Handle Main Photo Upload
            let uploadedPhoto = preview;
            if (preview instanceof File) {
                uploadedPhoto = await Imageupload(preview);
            }

            // 2. Handle Multiple Images Upload
            // Ensure multiplePreviews is an array before mapping
            const currentGallery = Array.isArray(multiplePreviews) ? multiplePreviews : [];

            const uploadPromises = currentGallery.map(async (file) => {
                // Only upload if it's a new File object, otherwise keep existing URL
                if (file instanceof File) {
                    return await Imageupload(file);
                }
                return file;
            });

            let uploadedMulImages = await Promise.all(uploadPromises);

            // 3. Construct Payload
            const updatePayload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                con: formData.condition,
                photo: uploadedPhoto,
                multipleimage: JSON.stringify(uploadedMulImages)
            };

            await axios.post(`https://data.bnpa.bd/products-update/${data.id}`, updatePayload);

            queryClient.invalidateQueries(['manage-shops']);
            setMultiplePreviews(uploadedMulImages);
            Toast.fire("Product updated!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative no-scrollbar">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                    <X size={20} />
                </button>

                <div className="p-8">
                    <h2 className="text-xl font-black text-slate-800 mb-6 uppercase">Edit Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Product Title</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full px-4 py-2 border rounded-lg outline-none"
                            />
                        </div>

                        {/* Main Photo */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Main Photo</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
                            {preview && (
                                <img src={renderImage(preview)} className="w-24 h-24 mt-3 object-cover rounded-lg border" alt="Main" />
                            )}
                        </div>

                        {/* Gallery */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Gallery</label>
                            <input type="file" multiple accept="image/*" onChange={handleMultipleImagesChange} className="w-full text-sm" />
                            <div className="flex flex-wrap gap-2 mt-3">
                                {Array.isArray(multiplePreviews) && multiplePreviews.map((src, i) => (
                                    <img
                                        key={i}
                                        src={renderImage(src)}
                                        className="w-12 h-12 object-cover rounded-lg border"
                                        alt="Gallery"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                            <textarea {...register("description")} rows="3" className="w-full px-4 py-2 border rounded-lg outline-none"></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                                <input {...register("category")} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Price (৳)</label>
                                <input type="number" {...register("price")} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#26bba4] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? "Updating..." : "Update Product Info"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;