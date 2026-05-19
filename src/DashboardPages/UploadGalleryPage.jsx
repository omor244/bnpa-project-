import  { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { Edit3, Trash2, ImageIcon } from "lucide-react";
import EditGalleryModal from "@/DashboardComponets/UploadGallery/EditGalleryModal";
import { Toast } from "@/Data/Data";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure";

const UploadGalleryPage = () => {
   
    const [selectedGallery, setSelectedGallery] = useState(null);
    const axiosSecure = useAxiosSecure()
    const { data: gallery, isLoading, refetch } = useQuery({
        queryKey: ['gallery-manage'],
        queryFn: async () => {
            const { data } = await axiosSecure("/upload-gallery");
            return data;
        }
    });

    const handelDelete = async (id) => {
        

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
                const res = await axios.get(`https://api.bnpa.bd/upload-gallery-delete/${id}`);

                if (res.data.success) {
                 

                    Toast.fire({
                        icon: "success",
                        title: "Issue deleted successfully"
                    });

                    refetch()
                }

            }
        });
    }

    if (isLoading) return <LoadingPage />;

    const galleryItems = gallery?.data || [];

    return (
        <div className="p-6 space-y-6">
            <div className="lg:flex justify-between items-center">
                <h1 className="text-2xl  font-black text-slate-800 uppercase tracking-tight">
                    Manage Gallery
                </h1>
                <div className="mt-4 ">
                    <Link className="bg-[#26bba4] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#1f9e8a] transition-all shadow-lg shadow-[#26bba4]/20" to={"/dashboard/upload-gallery-form"}>Add Gallery</Link>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        {/* Table Header */}
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Preview</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Gallery Title</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Total Images</th>
                                <th className="py-5 px-6 text-center text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-50">
                            {galleryItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                                                {item.images?.[0] ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-300">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="font-bold text-slate-700 max-w-[200px] truncate">
                                            {item.title}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="text-slate-500 text-sm max-w-[300px] truncate">
                                            {item.description}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#26bba4]/10 text-[#26bba4]">
                                            {item.images?.length || 0} Images
                                        </span>
                                    </td>

                                    <td className="py-4 px-6 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedGallery(item)}
                                                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:scale-105 transition-all shadow-sm"
                                                title="Edit Gallery"
                                            >
                                                <Edit3 size={18} />
                                            </button>

                                            <button
                                                onClick={() => handelDelete(item.id) }
                                                className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:scale-105 transition-all shadow-sm"
                                                title="Delete Gallery"
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

                {galleryItems.length === 0 && (
                    <div className="py-24 text-center bg-slate-50/50">
                        <ImageIcon className="mx-auto text-slate-200 mb-3" size={48} />
                        <p className="text-slate-400 font-medium italic">No gallery items found in the database.</p>
                    </div>
                )}
            </div>

            {selectedGallery && (
                <EditGalleryModal
                    data={selectedGallery}
                    onClose={() => setSelectedGallery(null)}
                />
            )}
        </div>
    );
};

export default UploadGalleryPage;