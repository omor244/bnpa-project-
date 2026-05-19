import { useQuery } from "@tanstack/react-query";


import LoadingPage from "../LoadingPage/LoadingPage";
import useAuth from "./useAuth";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";



const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
  
    
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        
        queryFn: async () => {
            
            const  {data}  = await axiosSecure(`/users/role?email=${user?.email}`)
            // console.log("data found",data)
            return data.role
        }
    })
    
    
    
    if (isLoading) return <LoadingPage/>
    // console.log(role)
    return { role };
};

export default useRole;