import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import axios from "axios";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { FaTag, FaTruck, FaUndoAlt, FaShieldAlt } from "react-icons/fa";

const ShopDetails = () => {
    const { id } = useParams();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://bnpa-shop-db.vercel.app/all-products/${id}`);
            return data.data;
        }
    });

    if (isLoading) return <LoadingPage />;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans bg-white">
            {/* TOP SECTION: Gallery and Purchase Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

                {/* Left: Gallery Part */}
                <div className="md:col-span-7 flex flex-col items-center">
                    <div className="w-full border rounded-lg overflow-hidden bg-slate-50 relative group">
                        <img
                            src={product.photo}
                            alt={product.title}
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                        <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm">
                            🔍
                        </button>
                    </div>
                    {/* Small Thumbnails Placeholder */}
                    <div className="flex gap-2 mt-4 self-start">
                        <div className="w-16 h-16 border-2 border-[#26bba4] rounded cursor-pointer overflow-hidden">
                            <img src={product.photo} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Right: Purchase Info Part */}
                <div className="md:col-span-5">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        {product.title}
                    </h1>
                    {/* <p className="text-sm text-gray-500 mb-4 underline cursor-pointer hover:text-[#26bba4]">
                        CIT Store (100% Positive Feedback)
                    </p> */}

                    <div className=" border-y border-gray-100 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-gray-900"> ৳{product.price}</span>
                       
                    </div>

                    <div className="my-3 space-y-3">
                        <div className="flex gap-10 text-sm">
                            <span className="text-gray-500 w-20">Condition:</span>
                            <span className="font-bold text-gray-800 italic">"{product.con}"</span>
                        </div>
                        <div className="flex gap-10 text-sm">
                            <span className="text-gray-500 w-20">Category:</span>
                            <span className="text-gray-800 font-medium">{product.category}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-8">
                        <Link to={`/checkout/${product.id}`} className="  py-3 bg-[#26bba4] hover:bg-[#1f9e8a]  px-22  lg:px-32  text-white font-bold rounded-full  transition-all">
                            Buy  Now
                        </Link>
                       
                    </div>

                    <div className="mt-6  ">
                        <h1 className="font-bold text-center text-lg pb-2">Shipping and Payment</h1>
                    <div className="flex  gap-4 ">
                        <span className="font-semibold text-gray-700">Shipping:</span>
                        <div className=" text-sm">
                                <p className="font-bold w-full">৳30 Registered Mail / GEP &  $5 International Mail (Registered)</p>
                          
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="font-semibold text-gray-700">Delivery:</span>
                        <div className="md:col-span-3 text-sm">
                            <p className="font-medium text-gray-800">Estimated between <span className="font-bold">Mon, May 11 and Mon, May 25</span></p>
                        </div>
                    </div>
                    <div className="mt-2">
                            <img className="lg:max-w-xl " src="https://i.ibb.co.com/3yNhQpMR/Whats-App-Image-2026-04-21-at-3-00-18-PM.jpg" alt="" />
                    </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Shipping, Returns, and Payments */}
            {/* <div className="border-t pt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping, returns, and payments</h2>

                <div className="space-y-6 max-w-4xl">
                  
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <span className="font-semibold text-gray-700">Returns:</span>
                        <div className="md:col-span-3 text-sm">
                            <p className="font-medium text-gray-800">30 days returns. Buyer pays for return shipping.</p>
                        </div>
                    </div>

             
                 
                </div>
            </div> */}

            {/* Description Section */}
            <div className="mt-12 p-6 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-lg mb-4 underline">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
        </div>
    );
};

export default ShopDetails;