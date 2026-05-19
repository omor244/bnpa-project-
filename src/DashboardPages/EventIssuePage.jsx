import LoadingPage from '@/components/LoadingPage/LoadingPage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { Imageupload } from '@/lib/utils';
import { Toast } from '@/Data/Data';
import EventIssueModal from '@/DashboardComponets/EventIssue/EventIssueModal';

const EventIssuePage = () => {
    const queryClient = useQueryClient();
    const [editingItem, setEditingItem] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 1. Fetch Data
    const { data: issue, isLoading, refetch } = useQuery({
        queryKey: ['newsItems-table'],
        queryFn: async () => {
            const { data } = await axios.get("https://api.bnpa.bd/events-issue");
            return data;
        }
    });

    // 2. Open Modal and Set Data
    const handleEditClick = (item) => {
        setEditingItem(item);
        reset({
            title: item.title,
            description: item.description,
            date: item.date ? new Date(item.date).toISOString().split('T')[0] : "",
        });
        document.getElementById('update_modal').showModal();
    };

    // 3. Update Mutation
    const updateMutation = useMutation({
        mutationFn: async (payload) => {
            return await axios.post(`https://api.bnpa.bd/events-issue-update/${editingItem.id}`, payload);
        },
        onSuccess: () => {
            document.getElementById('update_modal').close();
            Swal.fire({ icon: 'success', title: 'Updated!', text: 'Issue updated successfully.', confirmButtonColor: "#26bba4" });
            refetch();
        }
    });

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            let finalImageUrl = editingItem.image;

            // Conditional Image Upload
            if (data.image && data.image[0] instanceof File) {
                finalImageUrl = await Imageupload(data.image[0]);
            }

            const payload = {
                ...data,
                image: finalImageUrl
            }; 

           

            updateMutation.mutate(payload);
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <LoadingPage />;

    const handelDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete this issue!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26bba4",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.get(`https://api.bnpa.bd/events-issue-delete/${id}`);
                if (res.data.success) {
                    Toast.fire({
                        icon: "success",
                        title: "Issue deleted successfully"
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="lg:flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    Manage <span className="text-[#26bba4]">Events & Issues</span>
                </h2>
                <Link to={'events-issue-form'} className="bg-[#26bba4]  text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#1f9e8a] transition-all shadow-lg shadow-[#26bba4]/20">
                    Add New Issue
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-slate-100 pb-10">
                <table className="table w-full border-collapse">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="py-4 px-6 text-left">Thumbnail</th>
                            <th className="text-left">Title & Info</th>
                            <th className="text-left">Date</th>
                            <th className="text-left">Description</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {issue?.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-14 h-14 border border-slate-100 shadow-sm">
                                            <img src={item.image} alt="Issue" className="object-cover" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold text-slate-800">{item.title}</div>
                                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                                </td>
                                <td className="text-sm text-slate-500 italic">
                                    {new Date(item.date).toLocaleDateString('en-GB')}
                                </td>
                                <td className="max-w-xs truncate text-sm text-slate-500">
                                    {item.description}
                                </td>
                                <td>
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => handleEditClick(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                            <FaEdit size={16} />
                                        </button>
                                        <button onClick={() => handelDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- UPDATE MODAL --- */}
          <EventIssueModal handleSubmit={handleSubmit} onSubmit={onSubmit} isUpdating={isUpdating} errors={errors} register={register} editingItem={editingItem} />
        </div>
    );
};

export default EventIssuePage;