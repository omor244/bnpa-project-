import { useState } from "react";
import ShopCard from "@/components/Card/ShopCard";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShopPage = () => {
    const [page, setPage] = useState(1);
    const limit = 20; 

    const { data: shops, isLoading, isPlaceholderData } = useQuery({
        // Adding 'page' to queryKey is critical for refetching
        queryKey: ['shops', page],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/all-products?page=${page}&limit=${limit}`);
            return data;
        },
        placeholderData: (previousData) => previousData, // Keeps UI stable while loading next page
    });

    if (isLoading) return <LoadingPage />;

    const products = shops?.data || [];
    const pagination = shops?.pagination || {};
    const totalPages = pagination.totalPages || 1;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-8 pl-4 uppercase tracking-wide">
                SHOP <span className="text-[#26bba4]">NOW</span>
                <div className="border-b-4 border-[#26bba4] w-1/12 mx-auto mt-3"></div>
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[600px]">
                {products.map((product) => (
                    <ShopCard key={product.id} product={product} />
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    No products found.
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-40 transition-all font-medium text-slate-600"
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-all ${page === pageNumber
                                            ? "bg-[#26bba4] text-white shadow-md scale-105"
                                            : "bg-white border border-slate-200 text-slate-600 hover:border-[#26bba4]"
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => {
                            if (!isPlaceholderData && page < totalPages) {
                                setPage((old) => old + 1);
                            }
                        }}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-40 transition-all font-medium text-slate-600"
                    >
                        Next
                    </button>
                </div>

                {/* Status Text */}
                <p className="text-sm text-slate-500 font-medium">
                    Showing Page {page} of {totalPages}
                </p>
            </div>
        </div>
    );
};

export default ShopPage;