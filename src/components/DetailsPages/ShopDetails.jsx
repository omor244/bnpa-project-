import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import axios from "axios";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { handleAddToCart, Toast } from "@/Data/Data";
import useAuth from "../Hooks/useAuth";

const ShopDetails = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false); // State for popup
    const {user} = useAuth()
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://data.bnpa.bd/all-products/${id}`);
            return data.data;
        }
    });

    useEffect(() => {
        if (product?.photo) {
            setSelectedImage(product.photo);
        }
    }, [product,]);

    if (isLoading) return <LoadingPage />;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    let gallery = [];
    try {
        gallery = JSON.parse(product.multipleimage || "[]");
        if (!gallery.includes(product.photo)) {
            gallery = [product.photo, ...gallery];
        }
    } catch (e) {
        gallery = [product.photo];
    }

 

    return (
        <div className="max-w-11/12 mx-auto p-4 md:p-8 font-sans bg-white relative">

            {/* Image Popup / Lightbox */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setIsZoomed(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white text-4xl hover:scale-110 transition-transform"
                        onClick={() => setIsZoomed(false)}
                    >
                        ✕
                    </button>
                    <img
                        src={selectedImage || product.photo}
                        alt={product.title}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    />
                </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                {/* Left: Gallery Part */}
                <div className="md:col-span-6 flex flex-col">
                    <div className="w-full border rounded-lg overflow-hidden bg-slate-50 relative group py-12 flex items-center justify-center">
                        <img
                            onClick={() => setIsZoomed(true)}
                            src={selectedImage || product.photo}
                            alt={product.title}
                            className="w-full h-full object-contain transition-all duration-300"
                        />

                        {/* <button
                            
                            className="absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all hover:scale-110 active:scale-90"
                        >
                            <span className="text-xl">🔍</span>
                        </button> */}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap gap-3 mt-12">
                        {gallery.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`w-20 h-20 border-2 rounded-md cursor-pointer overflow-hidden transition-all ${(selectedImage === img) ? "border-[#26bba4] scale-105" : "border-transparent hover:border-gray-300"}`}
                            >
                                <img src={img} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Purchase Info Part */}
                <div className="md:col-span-5">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        {product.title}
                    </h1>

                    <div className="border-y border-gray-100 py-4 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-gray-900">৳{product.price}</span>
                    </div>

                    <div className="my-6 space-y-3">
                        <div className="flex gap-10 text-sm">
                            <span className="text-gray-500 w-20">Condition:</span>
                            <span className="font-bold text-gray-800 italic">"{product.con}"</span>
                        </div>
                        <div className="flex gap-10 text-sm">
                            <span className="text-gray-500 w-20">Category:</span>
                            <span className="text-gray-800 font-medium uppercase">{product.category}</span>
                        </div>
                    </div>

                    <div onClick={() => handleAddToCart(product, user, queryClient)} className="mt-8">
                        <Link
                            // to={`/checkout/${product.id}`}
                            to={``}
                            
                            className="inline-block text-center py-4 bg-[#26bba4] hover:bg-[#1f9e8a] w-full text-white font-bold rounded-full transition-all shadow-lg active:scale-95"
                        >
                            Add To Cart
                        </Link>
                    </div>

                    {/* Shipping and Payment Info */}
                    <div className="mt-8 p-4 border rounded-xl border-slate-100">
                        <h2 className="font-bold text-lg pb-3 border-b mb-3">Shipping and Payment</h2>
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <span className="font-semibold text-gray-600 text-sm">Shipping:</span>
                                <p className="text-sm font-bold text-gray-800">৳30 Registered Mail / GEP & $5 International Mail (Registered)</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-semibold text-gray-600 text-sm">Delivery:</span>
                                <p className="text-sm font-medium text-gray-800">Estimated between <span className="font-bold text-[#26bba4]">May 11 - May 25</span></p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <img
                                className="w-full h-auto rounded-lg"
                                src="https://i.ibb.co.com/3yNhQpMR/Whats-App-Image-2026-04-21-at-3-00-18-PM.jpg"
                                alt="Payment Methods Bangladesh"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#26bba4] rounded-full"></span>
                    Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>
        </div>
    );
};

export default ShopDetails;