import { useParams } from "react-router";
import LoadingPage from "../LoadingPage/LoadingPage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineArrowLeft, HiOutlineCollection, HiX } from "react-icons/hi"; // Added HiX for close button
import { useNavigate } from "react-router";
import { useState } from "react"; // Added useState

const GalleryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); // State for modal

    const { data: gellary, isLoading } = useQuery({
        queryKey: ['Gellary-Details', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://bnpa-mysql.vercel.app/upload-gallery/${id}`);
            return data;
        }
    });

    if (isLoading) return <LoadingPage />;

    const images = gellary?.images ? JSON.parse(gellary.images) : [];

    const handelimage = (image) => {
        setSelectedImage(image); // Open modal with clicked image
    };

    return (
        <section className="min-h-screen bg-white pb-20">
            <div className="bg-slate-50 border-b border-slate-100 py-16">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-[#26bba4] font-medium transition-colors mb-8"
                    >
                        <HiOutlineArrowLeft /> Back to Gallery
                    </button>

                    <div className="max-w-full text-center mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            {gellary?.title}
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed pl-6 italic">
                            {gellary?.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Photo Grid Section */}
            <div className="container mx-auto px-6 mt-16">
                <div className="flex items-center w-2/12 mx-auto mb-10">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Event Photos <span className="text-[#26bba4]">({images.length})</span>
                    </h2>
                    <div className="flex-grow ml-6 h-px bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((imgUrl, index) => (
                        <div
                            key={index}
                            // Updated width to 300px and height to 200px
                            className="group relative w-[300px] h-[200px] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 mx-auto"
                        >
                            <img
                                src={imgUrl}
                                alt={`${gellary?.title} - ${index + 1}`}
                                // object-cover ensures the image fills the 300x200 space without stretching
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div
                                onClick={() => handelimage(imgUrl)}
                                className="absolute cursor-pointer inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <div className="bg-white/90 p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <HiOutlineCollection className="text-[#26bba4] text-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {images.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400">No images available for this gallery.</p>
                    </div>
                )}
            </div>

            {/* --- Image Modal Overlay --- */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)} // Close on background click
                >
                    <button
                        className="absolute top-6 right-6 text-white text-4xl hover:text-[#26bba4] transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <HiX />
                    </button>

                    <img
                        src={selectedImage}
                        alt="Zoomed"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </div>
            )}
        </section>
    );
};

export default GalleryDetails;