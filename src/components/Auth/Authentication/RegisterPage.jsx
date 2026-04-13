import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { User, Mail, Lock, Phone, Eye, EyeOff, UserPlus, ShieldCheck } from 'lucide-react';
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuth from '@/components/Hooks/useAuth';
import { Toast } from '@/Data/Data';
import { saveorupdateuser } from '@/lib/utils';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, logOut } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({ defaultValues: { role: "member" } });

    const onSubmit = async (data) => {
        const { email, password, name, phone, role } = data;
        try {
            await createUser(email, password);
            await updateUserProfile(name, phone);
            await saveorupdateuser(data);
            await logOut();
            navigate('/login');
            Toast.fire({
                icon: 'info',
                title: 'Registration Successful',
                text: `Registered as BNPA ${role}. Please wait for admin approval.`,
                background: '#ffffff',
                color: '#0f172a',
                iconColor: '#26bba4',
            });
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Toast.fire({ icon: 'error', title: 'Email already in use' });
            } else {
                Toast.fire({ icon: 'error', title: 'Registration Failed', text: error.message });
            }
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: BNPA Brand Content */}
            <div className="hidden lg:flex relative bg-slate-50 items-center justify-center p-12 overflow-hidden border-r border-slate-100">
                <div className="absolute inset-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-[#26bba4] opacity-[0.08] blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200 opacity-[0.15] blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-md">
                    <div className="mb-10 flex items-center gap-3 bg-white/50 backdrop-blur-md border border-slate-200 w-fit px-4 py-2 rounded-full shadow-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26bba4] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#26bba4]"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">BNPA Member Portal</span>
                    </div>

                    <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Join the <br />
                        <span className="text-[#26bba4]">BNPA</span> Community
                    </h2>

                    <div className="space-y-6">
                        {[
                            { title: "Philatelic Heritage", desc: "Access exclusive archives of Bangladesh's national stamp history." },
                            { title: "Exhibition Access", desc: "Participate in national and international philatelic exhibitions." },
                            { title: "Collector Network", desc: "Connect with thousands of collectors across Bangladesh and beyond." }
                        ].map((item, i) => (
                            <div key={i} className="group flex gap-4 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#26bba4] font-bold border border-green-100">
                                    0{i + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-slate-900 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold text-lg">National Pride</p>
                                <p className="text-slate-400 text-xs uppercase tracking-wider">Preserving Bangladesh History</p>
                            </div>
                            <div className="h-10 w-10 rounded-full border-2 border-[#26bba4] flex items-center justify-center">
                                <div className="h-2 w-2 bg-[#26bba4] rounded-full" />
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#26bba4] opacity-10 blur-2xl" />
                    </div>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md space-y-8 py-12">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-4">
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Registration</h1>
                        <p className="text-slate-500 mt-2">Apply for Bangladesh National Philatelic Association membership.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Account Type</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-3 top-3 text-slate-400 z-10" size={18} />
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="pl-10 h-11 border-slate-200 focus:ring-[#26bba4]">
                                                <SelectValue placeholder="Select Account Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="member">General Member</SelectItem>
                                                <SelectItem value="admin">System Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <Input
                                    {...register("name", { required: "Full name is required" })}
                                    placeholder="Enter your name"
                                    className={`pl-10 h-11 ${errors.name ? 'border-red-500' : 'border-slate-200 focus:border-[#26bba4]'}`}
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <Input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`pl-10 h-11 ${errors.email ? 'border-red-500' : 'border-slate-200 focus:border-[#26bba4]'}`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <Input
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        minLength: { value: 11, message: "Enter a valid 11-digit number" }
                                    })}
                                    type="tel"
                                    placeholder="01XXX XXXXXX"
                                    className={`pl-10 h-11 ${errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-[#26bba4]'}`}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                                <Input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Must be at least 8 characters" }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`pl-10 h-11 ${errors.password ? 'border-red-500' : 'border-slate-200 focus:border-[#26bba4]'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-[#26bba4] hover:bg-[#1f9683] text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4"
                        >
                            {isSubmitting ? "Creating Account..." : "Apply for Membership"}
                            {!isSubmitting && <UserPlus className="ml-2" size={18} />}
                        </Button>

                        <p className="text-center text-slate-600 text-sm">
                            Already registered?{' '}
                            <Link to="/login" className="text-[#26bba4] font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}