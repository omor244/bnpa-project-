export default function JourneySection() {
    return (
        <section className="py-16 px-20 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Side: Image with shadow and rounded corners */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#26bba4] to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src="https://i.ibb.co.com/39HD0QzM/Whats-App-Image-2026-04-11-at-7-27-46-PM.jpg"
                                alt="BNPA Event"
                                className="relative rounded-lg shadow-2xl w-full object-cover h-[300px] md:h-[450px]"
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                                Journey of <span className="text-[#26bba4]">BNPA</span>
                            </h2>
                            <div className="h-1 w-20 bg-[#26bba4]" />
                        </div>

                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                            <p>
                                It is our pleasure to welcome you to the <span className="font-semibold text-slate-800">Bangladesh National Philatelic Association (BNPA)</span> website.
                                BNPA is one of the most prestigious and oldest hobby-based organizations in Bangladesh, dedicated to the art of philately.
                            </p>

                            <p>
                                A good number of philatelists, stamp collectors and enthusiasts of Bangladesh in a meeting held in Dhaka city on July 23, 1978, formed a National Philatelic body, under the style of Bangladesh National Philatelic Association (BNPA). The Association aims at the promotion of philately in the country through its various activities. It is a non-political, non-profit and non-government organization. The first full-fledged executive committee of the BNPA was elected unanimously in a meeting held on July 30, 1978. Mr. Zakiuddin Ahmed was elected as President when Mr. Kazi Shariful Alam was elected as General Secretary.
                            </p>
                        </div>

                    
                    </div>

                </div>
            </div>
        </section>
    );
}