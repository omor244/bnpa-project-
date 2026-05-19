import useAuth from "@/components/Hooks/useAuth";
import CheckoutLoggedUser from "./CheckoutLoggedUser";
import CheckoutAsGuest from "./CheckoutAsGuest";
import { useLoaderData } from "react-router";



const CheckoutPage = () => {
     const countries = useLoaderData()
    const { user } = useAuth()

    if (user) return <CheckoutLoggedUser countries={ countries} />

    return <CheckoutAsGuest/>
};

export default CheckoutPage;