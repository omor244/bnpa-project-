import React from 'react';

import { features } from '@/Data/DataForHome';



export default function FeatureGrid() {
    return (
        <section className="w-full">
      
    
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center justify-center py-12 px-4 transition-colors duration-300 cursor-pointer border-r border-white/10 last:border-r-0"
                        style={{
                            // Creating the green gradient effect from the screenshot
                            backgroundColor: `rgba(22, 163, 74, ${0.7 + (index * 0.05)})`,
                        }}
                    >
                        {/* Icon Container */}
                        <div className="text-white mb-6 transform transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-sm md:text-base font-bold tracking-wider text-center">
                            {item.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}