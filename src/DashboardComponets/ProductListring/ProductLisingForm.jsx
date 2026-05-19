import { useForm } from "react-hook-form";
import { useState } from "react";
import { Imageupload } from "@/lib/utils";
import axios from "axios";
import { Toast } from "@/Data/Data";
import Swal from "sweetalert2";

const ProductListingForm = () => {
    const [preview, setPreview] = useState(null);
    const [multiplePreviews, setMultiplePreviews] = useState([]); // State for gallery previews
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Handle Main Single Photo
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setValue("photo", file);
        }
    };

    // Handle Multiple Photos (Gallery)
    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Create previews for UI
            const filePreviews = files.map(file => URL.createObjectURL(file));
            setMultiplePreviews(filePreviews);

            // Store the array of file objects
            setValue("multipleimage", files);
        }
    };

    const onSubmit = async (data) => {
        try {


            // 1. Upload Main Image
            const mainImageUrl = await Imageupload(data.photo);

            // 2. Upload Multiple Images (Gallery)
            let galleryUrls = [];
            if (data.multipleimage && data.multipleimage.length > 0) {
                const uploadPromises = data.multipleimage.map(file => Imageupload(file));
                galleryUrls = await Promise.all(uploadPromises);
            }

         

            const finalData = {
                ...data,
                photo: mainImageUrl,
                multipleimage: galleryUrls // Sent to backend as an array of strings
            };

            


   
            // 3. Post to Backend
            const res = await axios.post("https://data.bnpa.bd/add-product", finalData);

            if (res.status === 201 || res.status === 200) {

                Toast.fire({
                    title: 'Success!',
                    text: 'Product and Gallery listed successfully.',
                    icon: 'success',
                    confirmButtonColor: '#26bba4',
                    timer: 2000
                });

                reset();
                setPreview(null);
                setMultiplePreviews([]);
            }

        } catch (error) {
            Swal.close();
            console.error("Submission failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.message || 'Something went wrong.',
                confirmButtonColor: '#ef4444',
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl border border-slate-100 font-sans">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4 italic">
                List New <span className="text-[#26bba4]">Product</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* 1. Title */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="e.g. Premium Web Template"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                {/* 2. Main Photo Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Main Product Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#26bba4]/10 file:text-[#26bba4] hover:file:bg-[#26bba4]/20 cursor-pointer"
                    />
                    {preview && (
                        <div className="relative w-32 h-32 mt-3">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                            <div className="absolute top-1 right-1 bg-[#26bba4] text-white text-[10px] px-1 rounded">Main</div>
                        </div>
                    )}
                </div>

                {/* 3. Multiple Gallery Photos */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Gallery (Multiple)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultipleImagesChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#26bba4]/10 file:text-[#26bba4] hover:file:bg-[#26bba4]/20 cursor-pointer"
                    />
                    {multiplePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {multiplePreviews.map((src, i) => (
                                <img key={i} src={src} className="w-16 h-16 object-cover rounded-lg border shadow-sm" alt={`Gallery ${i}`} />
                            ))}
                        </div>
                    )}
                </div>

                {/* 4. Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        {...register("description")}
                        placeholder="Brief details about the product..."
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 5. Item Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <input
                            {...register("category")}
                            placeholder="e.g. Software, Graphics"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none"
                        />
                    </div>

                    {/* 6. Price */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Price (৳)</label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none"
                        />
                    </div>
                </div>

                {/* 7. Condition */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                    <input
                        {...register("condition")}
                        placeholder="e.g. Brand New, Digital License"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer py-3 bg-[#26bba4] text-white font-bold rounded-lg hover:bg-[#1f9e8a] transition-all shadow-lg active:scale-95 mt-4"
                >
                    List Product & Gallery
                </button>
            </form>
        </div>
    );
};

export default ProductListingForm;