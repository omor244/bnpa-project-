import AddedCart from "@/components/AddToCart/AddedCart";
import OrderSummary from "@/components/AddToCart/OrderSummary";
import useAuth from "@/components/Hooks/useAuth";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {  ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router";


const AddToCart = () => {
    const queryClient = useQueryClient();
    const {user} = useAuth()
    const guestId = localStorage.getItem('guest_cart_id');

    const { data: cartResponse, isLoading } = useQuery({
        // 2. The queryKey must change whenever the user OR the guestId changes
        queryKey: ['cart-items', user?.email || guestId],

        queryFn: async () => {
           
            const identifier = user?  user?.email : guestId;

            if (!identifier) return []; // Safety check

            const { data } = await axios.get(`https://data.bnpa.bd/add-cart?email=${identifier}`);
            return data;
        },

        // 4. Enable the query if we have either a user email OR a guest ID
        enabled: !!(user?.email || guestId),
        retry: false
    });
 

    const cartItems = cartResponse?.data || [];
    
    
    
   
    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0) 

    
    
    if (isLoading ) return <LoadingPage/>

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#26bba4] p-3 rounded-2xl text-white">
                        <ShoppingBag size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Your <span className="text-[#26bba4]">Cart</span></h1>
                        <p className="text-slate-500 text-sm font-medium">{cartItems.length} Items saved in your shopping bag</p>
                    </div>
                </div>

            {cartItems.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-slate-100">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop" className="bg-[#26bba4] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#26bba4]/30 transition-all inline-flex items-center gap-2">
                            Return to Shop <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        
                        <div className="lg:col-span-3 space-y-4">
                            {cartItems.map((item) => {
                               
                                
                                const gallery = Array.isArray(item.multipleimage)
                                    ? item.multipleimage
                                    : (typeof item.multipleimage === 'string' ? JSON.parse(item.multipleimage) : []);
                               
                                return (
                                  <AddedCart item={item} key={item.id} gallery={gallery} queryClient={queryClient}/>
                                );
                            })}
                        </div>

                            {/* OrderSummary */}
                        <div className="lg:col-span-2">
                          <OrderSummary subtotal={subtotal} />
                        </div>
                    </div>
                 )} 
            </div>
        </div>
    );
};

export default AddToCart;