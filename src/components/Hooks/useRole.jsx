import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import LoadingPage from "../LoadingPage/LoadingPage";
import useAuth from "./useAuth";



const useRole = () => {

    const { user} = useAuth()
    const axiossecure = useAxiosSecure()
    
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        
        queryFn: async () => {
            
            const { data } = await axiossecure.get(`http://localhost:3000/users/role?email=${user?.email}`)
           
            return data.role
        }
    })
    
   


    if (isLoading) return <LoadingPage/>
    return { role };
};

export default useRole;