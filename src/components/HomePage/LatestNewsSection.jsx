
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router';
import LoadingPage from '../LoadingPage/LoadingPage';
import EventCard from '../Card/EventCard';



export default function LatestNewsSection() {

    const location = useLocation()

    const { data: newsItems, isLoading, refetch } = useQuery({
        queryKey: ['newsItems'],

        queryFn: async () => {

            const { data } = await axios.get("https://bnpa-mysql.vercel.app/latest-events/limit")

            return { data }
        }
    })

    console.log("form new",newsItems)

    if (isLoading) return <LoadingPage />


    return (
        <section className="py-16 lg:px-18  bg-white">
            <div className="container mx-auto lg:px-6">
          
                {/* Section Heading */}
                {location.pathname !== "/news" && <>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Latest Events & News
                        </h2>
                        <div className="h-1 w-16 bg-[#26bba4] mx-auto" />
                    </div>
                </>} 

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {newsItems.data.map((item) => <EventCard key={item._id} item={item}/>)}
                </div>
            </div>
        </section>
    );
}