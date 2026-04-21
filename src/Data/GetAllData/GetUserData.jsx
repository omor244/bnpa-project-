import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";


 



export const handleStatusUpdate = async (userId, newStatus, refetch ) => {
    console.log(userId, "and", newStatus)


    Swal.fire({
        title: "Update User Status?",
        text: `Are you sure you want to change this user's status to ${newStatus}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#26bba4", // Your brand teal
        cancelButtonColor: "#64748b",  // Slate gray for cancel
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "Cancel"
    })
        .then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const res = await axios.patch(`https://bnpa-mysql.vercel.app/users/${userId}`, { newStatus })
                       
                    console.log(res)
                    if (res.data.affectedRows) {

                        console.log(res.data)
                         refetch()
                        Swal.fire({
                            title: "Updated!",
                            text: `User status is now ${newStatus}.`,
                            icon: "success",
                            confirmButtonColor: "#26bba4"
                        });
                    }

                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while updating.",
                        icon: "error"
                    });
                }
            }





        });

}


export const handleDeleteUser = async (userId, refetch) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This user will be permanently removed from the database!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444", // Red for danger/delete
        cancelButtonColor: "#64748b",  // Slate for neutral cancel
        confirmButtonText: "Yes, delete user!",
        cancelButtonText: "Keep user",
        // Adding custom class for better styling if needed
        customClass: {
            confirmButton: 'rounded-lg px-4 py-2',
            cancelButton: 'rounded-lg px-4 py-2'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

                const res = await axios.delete(`https://bnpa-mysql.vercel.app/users/${userId}`)
                 
                console.log(res.data)
                if (res.data.message) {

                    console.log(res.data)
                     refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "The user account has been removed.",
                        icon: "success",
                        confirmButtonColor: "#26bba4"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Could not delete user. Please try again.",
                    icon: "error"
                });
            }
        }
    });
};


