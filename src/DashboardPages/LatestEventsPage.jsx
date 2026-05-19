import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { Imageupload } from "@/lib/utils";
import LatestEventsUpdatedForm from "@/DashboardComponets/LatestEventsForm/LatestEventsUpdatedForm";

const LatestEventsPage = () => {
    const queryClient = useQueryClient();
    const [editingItem, setEditingItem] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [thumbnailPreview, setThumbnailPreview] = useState(null); // Added for Single Preview
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, setValue } = useForm();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    // 1. Fetch Data
    const { data: newsItems, isLoading } = useQuery({
        queryKey: ['latest-news-management'],
        queryFn: async () => {
            const { data } = await axios.get("https://api.bnpa.bd/latest-events");
            return data;
        }
    });

    // 2. Set Form Data when Editing
    useEffect(() => {
        if (editingItem) {
            reset({
                title: editingItem.title,
                type: editingItem.type,
                date: editingItem.date ? new Date(editingItem.date).toISOString().split('T')[0] : "",
                description: editingItem.description,
            });

            // Set existing thumbnail preview
            setThumbnailPreview(editingItem.thumbnail);

            // Parse existing gallery
            const existingGallery = typeof editingItem.gallery === 'string'
                ? JSON.parse(editingItem.gallery)
                : editingItem.gallery || [];
            setGalleryPreviews(existingGallery);
        }
    }, [editingItem, reset]);

    
    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            return await axios.post(`https://api.bnpa.bd/latest-events-update/${editingItem.id}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['latest-news-management']);
            setEditingItem(null);
            setThumbnailPreview(null);
            setGalleryPreviews([]);
            setLoading(false);
            Toast.fire({ icon: "success", title: "Event updated successfully" });
        },
        onError: (error) => {
            setLoading(false);
            Toast.fire({ icon: "error", title: error.message });
        }
    });

    // 4. Handle Image Previews (Thumbnail)
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // If it's a new file, create a preview URL
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    // 5. Handle Image Previews (Gallery)
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        // Note: For updates, you might want to decide if you're replacing or appending.
        // This code replaces the previews with the newly selected files.
        setGalleryPreviews(urls);
    }

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let finalThumbnail = editingItem.thumbnail;
            let finalGallery = editingItem.gallery;

            // Thumbnail Upload: Only upload if a new file was actually selected
            if (data.thumbnail && data.thumbnail[0] instanceof File) {
                finalThumbnail = await Imageupload(data.thumbnail[0]);
            }

            // Gallery Upload: Only upload if new files were selected
            if (data.gallery && data.gallery.length > 0 && data.gallery[0] instanceof File) {
                const galleryFiles = Array.from(data.gallery);
                const uploadedUrls = await Promise.all(
                    galleryFiles.map(file => Imageupload(file))
                );
                finalGallery = uploadedUrls;
            }

            const payload = {
                ...data,
                thumbnail: finalThumbnail,
                gallery: Array.isArray(finalGallery) ? JSON.stringify(finalGallery) : finalGallery
            };

            updateMutation.mutate(payload);

        } catch (error) {
            console.error("Update Process Error:", error);
            setLoading(false);
            Toast.fire({ icon: "error", title: "Image upload failed." });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26bba4",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`https://api.bnpa.bd/latest-events-delete/${id}`).then(() => {
                    queryClient.invalidateQueries(['latest-news-management']);
                    Toast.fire({ icon: "success", title: "Deleted successfully" });
                });
            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    Manage <span className="text-[#26bba4]">Latest Events & News</span>
                </h2>
                <Link to={"latest-events-form"} className="bg-[#26bba4]/10 text-[#26bba4] px-6 py-2 rounded-full text-sm font-semibold border border-[#26bba4]">
                    Create New Event
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-slate-100 pb-10">
                <table className="table w-full">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="py-4 px-6">Thumbnail</th>
                            <th>Title & Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {newsItems?.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-14 h-14 border">
                                            <img src={item.thumbnail} alt="News" className="object-cover" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold text-slate-800">{item.title}</div>
                                    <span className="badge badge-sm bg-[#26bba4] border-none text-white uppercase px-2 py-0.5 text-[10px]">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="text-sm text-slate-500 italic">
                                    {new Date(item.date).toLocaleDateString('en-GB')}
                                </td>
                                <td className="max-w-xs truncate text-sm text-slate-500">
                                    {item.description}
                                </td>
                                <td>
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => setEditingItem(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                            <FaEdit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            {editingItem && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-8">
                    {/* Main Modal Container */}
                    <div className="bg-slate-50 rounded-[2rem] md:rounded-[3rem] w-full max-w-7xl max-h-[95vh] shadow-2xl relative flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                        {/* STICKY CLOSE BUTTON */}
                        <button
                            onClick={() => { setEditingItem(null); setThumbnailPreview(null); }}
                            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white shadow-xl rounded-full text-slate-400 hover:text-red-500 hover:rotate-90 transition-all z-[110] border border-slate-100"
                        >
                            <X size={24} />
                        </button>

                        {/* SCROLLABLE CONTENT AREA */}
                        <div className="overflow-y-auto p-6 md:p-12 custom-scrollbar">
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter">
                                    Update <span className="text-[#26bba4]">Existing Event</span>
                                </h2>
                                <p className="text-slate-400 font-medium italic mt-1">
                                    Modifying: <span className="text-slate-600">{editingItem.title}</span>
                                </p>
                            </div>

                            {/* The Form */}
                            <LatestEventsUpdatedForm
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                                register={register}
                                loading={loading}
                                thumbnailPreview={thumbnailPreview}
                                galleryPreviews={galleryPreviews}
                                handleThumbnailChange={handleThumbnailChange}
                                handleGalleryChange={handleGalleryChange}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestEventsPage;