import { HiOutlineArrowNarrowRight, HiOutlinePhotograph } from "react-icons/hi";
import { Link } from "react-router";


const GalleryCard = ({item, displayImage}) => {
    return (
        <div>
            <div

                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col"
            >
                {/* Picture Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={displayImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Count Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <HiOutlinePhotograph /> {item.images?.length || 0}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl text-center font-bold text-slate-800 line-clamp-1 group-hover:text-[#26bba4] transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-slate-500 text-center text-sm mt-2 line-clamp-2 flex-grow">
                        {item.description}
                    </p>

                    {/* Details Button */}
                    <Link
                        to={`/gallery/${item.id}`}
                        className="mt-6 flex items-center justify-between group/btn py-2 px-4 rounded-lg border border-[#26bba4] text-[#26bba4] font-bold hover:bg-[#26bba4] hover:text-white transition-all"
                    >
                        View Details
                        <HiOutlineArrowNarrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GalleryCard;