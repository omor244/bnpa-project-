import React from 'react';
import { useForm } from 'react-hook-form';
import { Truck, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/components/Hooks/useAuth';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import CheckoutOrderSummaryGuest from './CheckoutOrderSummaryGuest';

const CheckoutAsGuest = () => {
    // 1. Authentication & Session Identifiers
    const countries = useLoaderData()
    // console.log(countries)
    const { user } = useAuth();
    const guestId = localStorage.getItem('guest_cart_id');
    const identifier = user?.email || guestId;

    // 2. Form Architecture (React Hook Form)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, 
        reset
    } = useForm({
        defaultValues: {
            email: user?.email || '',
            FullName: '',
            phone: '',
            country: 'Australia',
            address: '',
            deliverySpeed: 'express'
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
    const shippingCost = selectedSpeed === 'express' ? 15.00 : 9.95;
    const gstIncluded = subtotal * 0.10; // Dynamically calculated at standard 10% rate
    const orderTotal = subtotal + shippingCost;

    // 5. Secure Checkout Dispatcher
    const onSubmit = async (data) => {

       
        try {
            const completeOrderPayload = {
                ...data,
                customer_email: identifier,
                is_guest: !user?.email,
                items: cartItems.map(item => ({
                    productId: item.productId || item._id || item.id,
                    title: item.title,
                    price: parseFloat(item.price),
                    quantity: item.quantity || 1
                })),
                financials: {
                    subtotal,
                    shippingCost,
                    gstIncluded,
                    orderTotal
                },
                submittedAt: new Date().toISOString()
            };

            console.log("Dispatching payload to endpoint:", completeOrderPayload);
              reset()
            // Execute order dispatch to backend API route
            // const response = await axios.post('https://data.bnpa.bd/orders', completeOrderPayload);

        } catch (error) {
            console.error("Order process execution fault:", error);
        }
    };

  
    if (isLoading) <LoadingPage/>

    return (
        <div className="min-h-screen bg-[#f6f6f6] py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Progress Stepper Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-normal text-slate-900 tracking-tight">Checkout</h1>
                    <p className="text-lg font-bold text-slate-500 mt-1">All fields are required
                        {/* unless marked as (optional) */}
                    </p>

            
                </div>

                {/* Main Content Layout Block */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT CONTAINER: Data Entry Forms */}
                    <div className="lg:col-span-7 space-y-5">

                        {/* Box A: Email Registration Block */}
                        <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-3">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                Check out as guest
                            </h2>
                            <div>
                                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">Email address</label>
                                <span className="text-[11px] text-slate-500 block mb-1.5">(we'll send your order confirmation here)</span>
                                <input
                                    type="email"
                                    disabled={!!user?.email}
                                    {...register('email', {
                                        required: "Email address is mandatory",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email formatting syntax" }
                                    })}
                                    className={`w-full p-2.5 border rounded text-sm transition-all outline-none ${user?.email ? 'bg-slate-50 text-slate-500 border-slate-200' : errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-400 focus:border-slate-900'}`}
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email.message}</p>}
                            </div>

                            {/* {!user && ( */}
                                <Link to="/login" className="inline-block">
                                    <button type="button" className="text-xs text-red-700 underline font-medium block hover:text-red-800">
                                        Log in or sign up instead
                                    </button>
                                </Link>
                            {/* )} */}
                        </div>

                        {/* Box B: Shipping Information Block */}
                        <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-5">
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
                                <span className="text-[11px] text-slate-500 block mb-1.5">For tracking notifications, enter a mobile number.</span>
                                <input
                                    type="tel"
                                    {...register('phone', { required: "Phone number tracking context is required" })}
                                    className={`w-full p-2.5 border rounded text-sm outline-none ${errors.phone ? 'border-red-500' : 'border-slate-400 focus:border-slate-900'}`}
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
                                    placeholder="Start typing address"
                                    {...register('address', { required: "A delivery endpoint address is required" })}
                                    className={`w-full p-2.5 border rounded text-sm outline-none ${errors.address ? 'border-red-500' : 'border-slate-400 focus:border-slate-900'}`}
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
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">Standard</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳9.95</span>
                                </label>

                                <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            value="express"
                                            {...register('deliverySpeed')}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">Express</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳15.00</span>
                                </label>

                                <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            value="International"
                                            {...register('deliverySpeed')}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300"
                                        />
                                        <span className="text-sm font-bold text-slate-800">International</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border rounded">৳15.00</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTAINER: Sticky Order Summary Sidebar */}
                    <div className="lg:col-span-5 lg:sticky lg:top-6">
                        <CheckoutOrderSummaryGuest subtotal={subtotal} selectedSpeed={selectedSpeed} cartItems={cartItems} orderTotal={orderTotal} gstIncluded={gstIncluded} shippingCost={shippingCost} />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CheckoutAsGuest;