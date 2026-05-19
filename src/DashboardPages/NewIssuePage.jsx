import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import { Toast } from "@/Data/Data";
import { Imageupload } from "@/lib/utils";
import { Link } from "react-router";
import NewIssueModal from "@/DashboardComponets/NewIssue/NewIssueModal";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure";

const API = "https://api.bnpa.bd"; 

const NewIssuePage = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure()
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

   
    const { data: issues, isLoading, refetch } = useQuery({
        queryKey: ["new-issue"],
        queryFn: async () => {
            const { data } = await axios.get(`${API}/new-issue-get`);
            return data;
        },
    });


    // console.log(issues)

    const { register, handleSubmit, reset } = useForm();

    
    const handleEditClick = (item) => {
        setSelectedIssue(item);
        setImagePreview(item.image);
        setSelectedFile(null);

        reset({
            title: item.title,
            dateOfIssue: item.dateOfIssue ? item.dateOfIssue.split("T")[0] : "",
            designer: item.designer,
            faceValue: item.faceValue,
            printers: item.printers || "",
            numStamps: item.numStamps || "",
            postmarkNumber: item.postmarkNumber || "",
            size: item.size,
            perforation: item?.perforation,
            quantity: item?.quantity,
            NumberofStampEachSheet: item?.NumberofStampEachSheet,
            color: item?.color,
            processPrinting: item?.processPrinting
        });

        document.getElementById("edit_issue_modal").showModal();
    };

  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

  
    const updateMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await axios.post(
                `https://api.bnpa.bd/new-issue-update/${selectedIssue.id}`,
                payload
            );
       
            return res.data; 
        },
       
        
        onSuccess: (data) => {
            console.log("Response:", data);

            Toast.fire({
                icon: "success",
                title: data?.message || "Updated successfully",
            });

            document.getElementById("edit_issue_modal").close();

            queryClient.invalidateQueries(["new-issue"]);

           
            setIsUploading(false);
            setSelectedFile(null);
            setSelectedIssue(null);
        },

        onError: (err) => {
            console.error(err);
            setIsUploading(false);
            document.getElementById("edit_issue_modal").close();
            Swal.fire(
                "Update Failed",
                err.response?.data?.message || "Server error",
                "error"
            );
        },
    });

    
    const onSubmit = async (formData) => {
        if (!selectedIssue) return;

        setIsUploading(true);

        try {
            let imageUrl = selectedIssue.image;

            if (selectedFile) {
                imageUrl = await Imageupload(selectedFile);
            }

            const payload = {
                ...formData,
                image: imageUrl,
            };
             
            console.log(payload)
            updateMutation.mutate(payload);
        } catch (error) {
            console.error(error);
            setIsUploading(false);

            Swal.fire("Error", "Image upload failed", "error");
        }
    };

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
                try {
                    const res = await axios.get(`https://api.bnpa.bd/new-issue-delete/${id}`);
 
                    console.log(res)
                    if (!res.data.success) {
                        console.error("Server Error:", res.status);
                        Toast.fire({
                            icon: "error",
                            title: `Server returned ${res.status}. Check backend routing.`
                        });
                        return;
                    }

                  

                    

                    if (res.data.success) {
                        Toast.fire({
                            icon: "success",
                            title: "Issue deleted successfully"
                        });
                        refetch();
                    }
                } catch (error) {
                    console.error("Network Error:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Could not connect to the server."
                    });
                }
            }
        });
    }
    if (isLoading) return <LoadingPage />;

    return (
      <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen font-sans">
 
    <div className="lg:flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
            Manage <span className="text-[#26bba4]">New Issues</span>
                </h2>
                
                <div className="mt-10">
                    <Link to={'new-issue-form'} className={"bg-[#26bba4] text-white px-6 py-2 rounded-lg font-bold cursor-pointer"}>Add New Issue</Link>
                </div>
    </div>

  
    <div className="overflow-x-auto shadow-xl rounded-2xl border border-slate-100">
        <table className="table w-full">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-black">
                <tr>
                    <th className="py-4 px-6 text-left">Stamp</th>
                    <th className="text-left">Details</th>
                    <th className="text-left">Value</th>
                    <th className="text-left">Designer</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {issues?.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                            <img
                                src={item.image}
                                className="w-12 h-12 mask mask-squircle object-cover"
                                alt={item.title}
                            />
                        </td>

                        <td className="font-bold text-slate-700">{item.title}</td>
                        <td className="text-slate-600">{item.faceValue}</td>
                        <td className="text-slate-500">{item.designer}</td>

                        <td className="text-center">
                            <button
                                onClick={() => handleEditClick(item)}
                                className="p-2 text-blue-600 bg-blue-50 rounded-lg mr-2 hover:bg-blue-100 transition-colors"
                            >
                                <FaEdit />
                            </button>

                            <button  onClick={() => handelDelete(item.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Modal */}
    <NewIssueModal handleImageChange={handleImageChange} imagePreview={imagePreview} register={register} handleSubmit={handleSubmit} isUploading={isUploading} updateMutation={updateMutation} fileInputRef={fileInputRef} onSubmit={onSubmit} />
</div>
    );
};

export default NewIssuePage;