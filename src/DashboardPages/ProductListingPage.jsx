import React, { useState } from "react";
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
import { ImageIcon, Edit3, Trash2, ShoppingBag } from "lucide-react";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import EditProductModal from "@/DashboardComponets/ProductListring/EditProductModal";
import Swal from "sweetalert2";
import { Toast } from "@/Data/Data";
import { Link } from "react-router";



const ProductListingPage = () => {
    
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: shops, isLoading, refetch } = useQuery({
        queryKey: ['manage-shops'],
        queryFn: async () => {
            const { data } = await axios.get(`https://data.bnpa.bd/all-products`);
           
            return data;
        },
    });

   
    const handleDelete = async (id) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete this issue!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26bba4",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.get(`https://data.bnpa.bd/delete-product/${id}`)
               
                console.log(res.data)
                if (res.data.success) {


                    Toast.fire({
                        icon: "success",
                        title: "Issue deleted successfully"
                    });

                    refetch()
                }

            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-6 space-y-6">
            <div className="lg:flex items-center justify-between">
                <h2 className="lg:text-2xl text-lg font-black text-slate-800 flex items-center gap-2">
                    <ShoppingBag className="text-[#26bba4]" /> Product Management
                </h2>
                <div className="mt-8">
                    <Link to={"/dashboard/Product-uploading"} className="bg-[#26bba4] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#1f9e8a] transition-all shadow-lg shadow-[#26bba4]/20">
                        Add Product
                    </Link>
               </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Preview</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Title & Category</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Price</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Condition</th>
                                <th className="py-5 px-6 text-center text-xs font-black text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {shops?.data?.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                            {item.photo ? (
                                                <img src={item.photo} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon size={20} /></div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-slate-700 truncate max-w-[200px]">{item.title}</div>
                                        <div className="text-[10px] text-[#26bba4] font-bold uppercase">{item.category}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-black text-slate-900">৳{item.price}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                                            {item.con || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedProduct(item)}
                                                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all shadow-sm"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Editing */}
            {selectedProduct && (
                <EditProductModal
                    data={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default ProductListingPage;