// import React, { useState, useEffect } from 'react';
import { galleryImages } from '@/Data/DataForHome';
import { ChevronUp } from 'lucide-react';
import { Link } from 'react-router';



export default function PhotoGallery() {
 

    return (
        <section className="py-16 bg-white relative">
            <div className="container mx-auto px-4">

                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">
                        Photo Gallery
                    </h2>
                    <div className="h-1 w-16 bg-[#26bba4] mx-auto" />
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative aspect-video overflow-hidden group cursor-pointer"
                        >
                            <img
                                src={image.src}
                                alt="Gallery content"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          
                        </div>
                    ))}

                </div>
           
               
            </div>

            {/* Floating Back to Top Button */}
            {/* {showTopBtn && (
                <button
                    onClick={goToTop}
                    className="fixed bottom-8 right-8 z-50 bg-[#1e293b] hover:bg-[#26bba4] text-white p-3 rounded shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                    aria-label="Back to top"
                >
                    <ChevronUp size={24} />
                </button> */}
            {/* )} */}
        </section>
    );
}