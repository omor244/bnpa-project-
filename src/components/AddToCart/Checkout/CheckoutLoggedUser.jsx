import React from 'react';
import { useForm } from 'react-hook-form';
import { Truck, Mail, Phone, ShieldCheck, Loader2, UserCheck } from 'lucide-react';
import { Link } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/components/Hooks/useAuth';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import CheckoutOrderSummary from './CheckoutOrderSummary';

const CheckoutLoggedUser = ({ countries }) => {
    // console.log(countries)
    // 1. Authentication & Session Identifiers
    const { user } = useAuth();
    const identifier = user?.email;

    // 2. Form Architecture (React Hook Form)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: user?.email || '',
            FullName: user?.displayName?.split(' ')[0] || '', // Pre-fill first name if available
            phone: '',
            country: 'Bangladesh', // Defaulting to Bangladesh for local payment integration context
            address: '',
            deliverySpeed: 'standard'
        }
    });

    const selectedSpeed = watch('deliverySpeed');

    // 3. Database Data Synchronizer (React Query)
    const { data: cartResponse, isLoading } = useQuery({
        queryKey: ['cart-items', identifier],
        queryFn: async () => {
            if (!identifier) return [];
            const { data } = await axios.get(`https://data.bnpa.bd/add-cart?email=${identifier}`);
            return data;
        },
        enabled: !!identifier,
        retry: false
    });

    const cartItems = cartResponse?.data || [];

    // 4. Financial Calculation Engine
    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);

    // Adjusted shipping pricing options to match Bangladeshi local currency contexts if needed
    const shippingCost = selectedSpeed === 'express' ? 150.00 : selectedSpeed === 'International' ? 500.00 : 60.00;
    const vatIncluded = subtotal * 0.05; // Set standard Bangladesh local VAT rate to 5% dynamically
    const orderTotal = subtotal + shippingCost;

    // 5. Secure Checkout Dispatcher
    const onSubmit = async (data) => {
        try {
            const completeOrderPayload = {
                ...data,
                customer_email: identifier,
                is_guest: false,
                items: cartItems.map(item => ({
                    productId: item.productId || item._id || item.id,
                    title: item.title,
                    price: parseFloat(item.price),
                    quantity: item.quantity || 1
                })),
                financials: {
                    subtotal,
                    shippingCost,
                    vatIncluded,
                    orderTotal
                },
                submittedAt: new Date().toISOString()
            };

            console.log("Dispatching authenticated order payload:", completeOrderPayload);

            // Execute order dispatch to backend API route
            // const response = await axios.post('https://data.bnpa.bd/orders', completeOrderPayload);

        } catch (error) {
            console.error("Order process execution fault:", error);
        }
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="min-h-screen bg-[#f6f6f6] py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Progress Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-normal text-slate-900 tracking-tight">Checkout</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Please fill in your delivery parameters below</p>
                </div>

                {/* Main Content Layout Block */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT CONTAINER: Shipping & Account Details */}
                    <div className="lg:col-span-7 space-y-5">

                        {/* Box A: Authenticated User Status Information (Replaces Guest Email Input Block) */}
                        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-full text-emerald-600">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900">Logged in account</h2>
                                    <p className="text-xs text-slate-500">{user?.email || identifier}</p>
                                </div>
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Verified
                            </span>
                        </div>

                        {/* Box B: Shipping Information Block */}
                        <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-5">
                            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Delivery Address</h2>

                            <div className="">
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        {...register('FullName', { required: "Given name is required" })}
                                        className={`w-full p-2.5 border rounded text-sm outline-none ${errors.FullName ? 'border-red-500' : 'border-slate-400 focus:border-slate-900'}`}
                                    />
                                    {errors.FullName && <p className="text-xs text-red-600 mt-1">{errors.FullName.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">Phone number</label>
                                <span className="text-[11px] text-slate-500 block mb-1.5">For delivery tracking and courier alerts.</span>
                                <input
                                    type="tel"
                                    placeholder="e.g., +8801XXXXXXXXX"
                                    {...register('phone', { required: "Phone number tracking context is required" })}
                                    className={`w-full p-2.5 border rounded text-sm outline-none transition-all ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-slate-900'}`}
                                />
                                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                            </div>


                            <div>
                                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Country</label>
                                <select
                                    {...register('country', { required: "Please select your country" })}
                                    className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white outline-none focus:border-slate-900 transition-all disabled:bg-slate-50 disabled:text-slate-400"
                                    disabled={countries?.length === 0}
                                >
                                    {/* Replace your current countries.map block with this clean extraction block */}
                                    {countries && [...countries]
                                        .map(c => c.name?.common)
                                        .filter(Boolean)
                                        .sort((a, b) => a.localeCompare(b))
                                        .map((countryName) => (
                                            <option key={countryName} value={countryName}>
                                                {countryName}
                                            </option>
                                        ))
                                    }
                                </select>
                                {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Shipping Address</label>
                                <input
                                    type="text"
                                    placeholder="House, Street road, Area details"
                                    {...register('address', { required: "A delivery endpoint address is required" })}
                                    className={`w-full p-2.5 border rounded text-sm outline-none transition-all ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-slate-900'}`}
                                />
                                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>}
                            </div>
                        </div>

                        {/* Box C: Logistics Options Panels */}
                        <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base font-bold text-slate-900">Delivery speed</h2>
                            <div className="border border-slate-300 rounded divide-y divide-slate-200">
                                <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            value="standard"
                                            {...register('deliverySpeed')}
                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">Standard Delivery</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳60.00</span>
                                </label>

                                <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            value="express"
                                            {...register('deliverySpeed')}
                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">Express Delivery</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳150.00</span>
                                </label>

                                <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            value="International"
                                            {...register('deliverySpeed')}
                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">International Shipping</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳500.00</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTAINER: Sticky Order Summary Sidebar */}
                    <div className="lg:col-span-5 lg:sticky lg:top-6">
                      <CheckoutOrderSummary subtotal={subtotal} selectedSpeed={selectedSpeed} cartItems={cartItems} orderTotal={orderTotal} vatIncluded={vatIncluded} shippingCost={shippingCost} />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CheckoutLoggedUser;