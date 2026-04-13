import LatestNews from "@/components/HomePage/LatestNews";


const NewsPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Professional Title Header */}
            <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
                        News & <span className="text-[#26bba4]">Events</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#26bba4] mx-auto rounded-full mb-6" />
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light leading-relaxed">
                        Stay updated with the latest happenings, community announcements,
                        and upcoming cultural celebrations within the BASSA community.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="pb-12  mt-[-80px] px-22">
              <LatestNews/>
            </div>

         
        </main>
    );
};

export default NewsPage;