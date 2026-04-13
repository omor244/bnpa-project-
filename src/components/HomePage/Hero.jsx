import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { slides } from "@/Data/DataForHome";



export default function Hero() {
    const [api, setApi] = React.useState();

    // Custom Autoplay Logic
    React.useEffect(() => {
        if (!api) return;

        const intervalId = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0); // Go back to start if at the end
            }
        }, 3000); // 3 seconds

        return () => clearInterval(intervalId);
    }, [api]);

    return (
        <section className="relative w-full">
            <Carousel
                setApi={setApi} // This connects our local state to the Carousel
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <div className="relative h-[15vh] md:h-[75vh] lg:h-[65vh] overflow-hidden">
                                <img
                                    src={slide.image}
                                    alt="Hero Slide"
                                    className="absolute inset-0  w-full object-cover object-center"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="hidden md:block">
                    <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 border-none bg-black/20 text-white hover:bg-black/40" />
                    <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 border-none bg-black/20 text-white hover:bg-black/40" />
                </div>
            </Carousel>
        </section>
    );
}