import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import LoadingPage from "../LoadingPage/LoadingPage";
import useAuth from "./useAuth";
import axios from "axios";



const useRole = () => {

    const { user} = useAuth()
    const axiossecure = useAxiosSecure()
    
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        
        queryFn: async () => {
            
            const  {data}  = await axios.get(`https://bnpa-mysql.vercel.app/users/role?email=${user?.email}`)
            console.log("data found",data)
            return data.role
        }
    })
    
   console.log(role)


    if (isLoading) return <LoadingPage/>
    return { role };
};

export default useRole;