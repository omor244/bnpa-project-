import React, { useState } from "react";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2, Mail, Shield, Eye, X, User, MapPin, CreditCard, Phone, Bookmark } from "lucide-react";
import Swal from "sweetalert2";
import DetailsModal from "@/DashboardComponets/MemberPage/DetailsModal";

const ManageMembers = () => {
    const queryClient = useQueryClient();
    const [selectedMember, setSelectedMember] = useState(null); // State for Modal

    const { data: members, isLoading } = useQuery({
        queryKey: ['Manage_members'],
        queryFn: async () => {
            const { data } = await axios.get("https://api.bnpa.bd/membership");
            return data;
        }
    });

    const handleStatusChange = async (id, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to change this member's status to ${newStatus}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26bba4",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post(`https://api.bnpa.bd/membership-status/${id}`, { status: newStatus });
                    queryClient.invalidateQueries(['Manage_members']);
                    Swal.fire({
                        title: "Updated!",
                        text: `Member status is now ${newStatus}.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: "#26bba4",
                    });
                } catch (error) {
                    Swal.fire({ title: "Error!", text: "Failed to update status.", icon: "error" });
                }
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This member will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.get(`https://api.bnpa.bd/membership-status/${id}`);
                    queryClient.invalidateQueries(['Manage_members']);
                    Swal.fire({ title: "Deleted!", icon: "success", timer: 1500 });
                } catch (error) {
                    Swal.fire({ title: "Error!", text: "Could not delete.", icon: "error" });
                }
            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="mb-6 flex items-center gap-2">
                <Shield className="text-[#26bba4]" />
                <h2 className="text-2xl font-black text-slate-800 uppercase">Manage BNPA Members</h2>
            </div>

            <div className="bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Member</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Type</th>
                                <th className="py-5 px-6 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                                <th className="py-5 px-6 text-center text-xs font-black text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {members?.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={member.profileImage} className="w-10 h-10 rounded-full object-cover border" alt="" />
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">{member.fullName}</div>
                                                <div className="text-[10px] text-slate-400">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-xs font-semibold text-slate-600">{member.memberType}</td>
                                    <td className="py-4 px-6">
                                        <select
                                            value={member.status}
                                            onChange={(e) => handleStatusChange(member.id, e.target.value)}
                                            className={`text-[14px] font-bold px-2 py-1 rounded-md outline-none ${member.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-6">
                                            {/* VIEW DETAILS BUTTON */}
                                            <button onClick={() => setSelectedMember(member)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(member.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MEMBER DETAILS MODAL */}
            {selectedMember && (
                <DetailsModal setSelectedMember={setSelectedMember} selectedMember={selectedMember}/>
            )}
        </div>
    );
};

export default ManageMembers;