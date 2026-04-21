import { useForm } from "react-hook-form";
import { useState } from "react";
import { Imageupload } from "@/lib/utils";
import axios from "axios";
import { Toast } from "@/Data/Data";
import Swal from "sweetalert2";

const ProductListing = () => {
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Fixed: e.target.files[0] to get the actual file
        if (file) {
            // 1. Create a preview for the UI
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            // 2. Store the ACTUAL file object in React Hook Form for imgbb
            setValue("photo", file);
        }
    };

    const onSubmit = async (data) => {
        try {
            // 1. Uploading image to imgbb
            const imageUrl = await Imageupload(data.photo);

            if (!imageUrl) {
                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'Could not get a URL from imgbb.',
                });
                return;
            }

            const finalData = {
                ...data,
                photo: imageUrl
            };

            // 2. Posting to your Backend
            const res = await axios.post("https://bnpa-shop-db.vercel.app/add-product", finalData);
           
            console.log(res)
          
            if (res.status === 201 || res.status === 200) {
                console.log("Server Response:", res.data);

                // 4. Success Message using SweetAlert2
                Toast.fire({
                    title: 'Success!',
                    text: 'Product listed successfully.',
                    icon: 'success',
                    confirmButtonColor: '#26bba4', // Using your signature CIT color
                    timer: 2000
                });

                reset();
                setPreview(null);
            }

        } catch (error) {
            console.error("Submission failed:", error);

            // Error Message
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.message || 'Something went wrong on the server.',
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

                {/* 2. Photo Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#26bba4]/10 file:text-[#26bba4] hover:file:bg-[#26bba4]/20 cursor-pointer"
                    />
                    {preview && (
                        <div className="relative w-32 h-32 mt-3">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                            <div className="absolute top-1 right-1 bg-[#26bba4] text-white text-[10px] px-1 rounded">Preview</div>
                        </div>
                    )}
                </div>

                {/* 3. Description */}
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
                    {/* 4. Item Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <input
                            {...register("category")}
                            placeholder="e.g. Software, Graphics"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#26bba4] outline-none"
                        />
                    </div>

                    {/* 5. Price */}
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

                {/* 6. Condition */}
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
                    List Product
                </button>
            </form>
        </div>
    );
};

export default ProductListing;