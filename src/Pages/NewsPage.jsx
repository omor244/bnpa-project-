import LatestNews from "@/components/News/LatestNews";



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
                  
                </div>
            </div>

            {/* Content Section */}
            <div className="pb-12  mt-[-80px] px-10">
              <LatestNews/>
            </div>

         
        </main>
    );
};

export default NewsPage;