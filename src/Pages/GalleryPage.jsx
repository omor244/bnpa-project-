import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router"; // or "next/link" if using Next.js
import { HiOutlineArrowNarrowRight, HiOutlinePhotograph } from "react-icons/hi";
import GalleryCard from "@/components/Card/GalleryCard";

const GalleryPage = () => {
    const { data: gellary, isLoading } = useQuery({
        queryKey: ['gellary'],
        queryFn: async () => {
            const { data } = await axios.get("https://bnpa-mysql.vercel.app/upload-gallery");
            return data;
        }
    });

    if (isLoading) return <LoadingPage />;

    const gellaryes = gellary?.data || [];

    return (
        <section className="py-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-800 uppercase tracking-tighter">
                        Photo <span className="text-[#26bba4]">Gallery</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#26bba4] mx-auto mt-4 rounded-full"></div>
                  
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-11/12 mx-auto gap-8">
                    {gellaryes.map((item) => {
                        // Handle JSON stringified images from MySQL
                        const images = typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
                        const displayImage = images?.[0] || 'https://via.placeholder.com/400';

                        return <GalleryCard key={item.id} item={item} displayImage={displayImage} />
                    })}
                </div>

                {/* Empty State */}
                {gellaryes.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 italic">No gallery items found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GalleryPage;