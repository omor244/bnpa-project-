import MemberShipCard from '@/components/Card/MemberShipCard';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const MemberShipPage = () => {
    const { data: members, isLoading } = useQuery({
        queryKey: ['membershipData'],
        queryFn: async () => {
            const { data } = await axios.get("https://bnpa-mysql.vercel.app/membership");
            return data; // Returning data directly for cleaner mapping
        }
    });

    if (isLoading) return <LoadingPage />;

    return (
        <div className="max-w-10/12 mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 uppercase border-b-2 border-[#26bba4] pb-4">
                Our Honorable Members
            </h1>

            {/* Grid Layout: 4 columns on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members?.map((member) => <MemberShipCard key={member.id} member={member}/> )}
            </div>

            {/* Empty State */}
            {members?.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No members found.
                </div>
            )}
        </div>
    );
};

export default MemberShipPage;