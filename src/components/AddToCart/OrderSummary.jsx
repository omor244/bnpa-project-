import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";


const OrderSummary = ({subtotal}) => {
    const { user } = useAuth()
    return (
        <div>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 sticky top-28">
                <h3 className="text-xl font-black text-slate-800 uppercase mb-6 pb-4 border-b border-dashed">Order Summary</h3>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Subtotal</span>
                        <span className="text-slate-800">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Shipping</span>
                        <span className="text-[#26bba4] font-bold">Free</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Estimated Tax</span>
                        <span className="text-slate-800">৳0.00</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between items-end">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-3xl font-black text-[#26bba4]">৳{subtotal.toFixed(2)}</span>
                    </div>
                </div>
                {user ? <>     <Link to={'/shop-cart/checkout'}>
                    <button className="w-full hover:cursor-pointer bg-[#26bba4] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#26bba4]/20 transition-all active:scale-[0.98] mb-4">
                        Proceed to Checkout
                    </button>
                </Link> </>

                    : <>
                        <Link to={'/login'}>
                            <button className="w-full hover:cursor-pointer bg-[#26bba4] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#26bba4]/20 transition-all active:scale-[0.98] mb-4">
                                Login or sign up
                            </button>
                        </Link>
                        <p className="text-2xl text-center font-semibold text-gray-500 py-3">Or</p>
                        <Link to={'/shop-cart/checkout/guest'}>
                            <button className="w-full hover:cursor-pointer bg-[#26bba4] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#26bba4]/20 transition-all active:scale-[0.98] mb-4">
                                Check out as guest
                            </button>
                        </Link>
                    </>}


                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                    Secure SSL Encrypted Payment
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;