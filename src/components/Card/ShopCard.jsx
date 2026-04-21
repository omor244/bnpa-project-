import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router";


const ShopCard = ({ product}) => {
    return (
        <div>
            <div
              
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col"
            >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={product.photo}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-[#26bba4]">
                        {product.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/shop/${product.id}`} className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#26bba4] transition-colors">
                        {product.title}
                    </Link>

                    {/* <p className="text-sm text-slate-500 mt-1 line-clamp-2 mb-4">
                        {product.description}
                    </p> */}

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-900">
                           ৳{product.price}
                        </span>

                        {/* Buy Now Button -> Redirects to Checkout */}
                        <Link
                            to={`/checkout/${product.id}`}
                            className="bg-[#26bba4] hover:bg-[#1f9e8a] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md active:scale-95"
                        >
                            Buy Now
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ShopCard;