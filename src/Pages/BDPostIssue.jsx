import BDPostIssueCard from '@/components/Card/BDPostIssueCard';
import React from 'react';
import { FileStack } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingPage from '@/components/LoadingPage/LoadingPage';

const BDPostIssue = () => {
    const { data: issue, isLoading, refetch } = useQuery({
        queryKey: ['newsItems'],

        queryFn: async () => {

            const { data } = await axios.get("https://bnpa-mysql.vercel.app/events-issue")
 
            return { data, isLoading, refetch }
        }
    })

    

    if (isLoading) return <LoadingPage />
    return (
        <div className="min-h-screen bg-slate-50/50 ">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 mb-10">
                <div className="pl-38  px-4 py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#26bba4]/10 rounded-lg">
                            <FileStack className="text-[#26bba4]" size={28} />
                        </div>
                        <span className="text-[#26bba4] font-bold tracking-widest text-xs uppercase">
                            Bangladesh National Philatelic Association
                        </span>
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Official Document <span className="text-[#26bba4]">Portal</span>
                    </h1>

                    <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
                        Access and manage official Bangladesh post issues and commemorative documents.
                        This portal serves as the primary repository for BNPA event documentation and verified philatelic records.
                    </p>
                </div>
            </div>

            
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  w-10/12 mx-auto">
                {
                    issue.data.map(item => <BDPostIssueCard key={item.id} item={item} /> )
                    }
                   
                </div>
           
        </div>
    );
};

export default BDPostIssue;