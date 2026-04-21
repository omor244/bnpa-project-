import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import useAuth from '@/components/Hooks/useAuth';
import { Toast } from '@/Data/Data';

export default function LoginPage() {
    const { signIn } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: user } = await axios.get(`https://bnpa-mysql.vercel.app/users/role?email=${data.email}`);

            if (!user) {
                Toast.fire({
                    icon: 'error',
                    title: 'User not found',
                    text: 'No BNPA account associated with this email exists.',
                });
                return;
            }

            if (user.status !== "padding") {
                await signIn(data.email, data.password);

                Toast.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Successfully logged into the BNPA Portal.',
                    timer: 1500
                });

                navigate("/dashboard");
            } else {
                Toast.fire({
                    icon: 'info',
                    title: 'Approval Pending',
                    text: 'Your BNPA membership is awaiting admin approval.',
                    background: '#ffffff',
                    color: '#0f172a',
                    iconColor: '#26bba4',
                });
            }

        } catch (error) {
            console.error("Login Error:", error);

            let errorMessage = "An unexpected error occurred. Please try again.";

            if (error.response) {
                errorMessage = error.response.data?.message || "Invalid credentials or server error.";
            } else if (error.request) {
                errorMessage = "Unable to connect to the BNPA server. Please check your internet.";
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                errorMessage = "Invalid email or password.";
            }

            Toast.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                background: '#ffffff',
                color: '#0f172a',
                iconColor: '#ef4444',
            });
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex relative bg-slate-950 items-center justify-center p-12 overflow-hidden">

                {/* Background Gradient Layers */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#26bba4] opacity-[0.15] blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-900 opacity-[0.2] blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                {/* Content Section */}
                <div className="relative z-10 max-w-md text-center">
                    <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl mx-auto">
                        <div className="w-8 h-8 rounded-full bg-[#26bba4] animate-pulse" />
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Welcome to the <br />
                        <span className="text-[#26bba4] drop-shadow-[0_0_15px_rgba(38,187,164,0.3)]">
                            BNPA Portal
                        </span>
                    </h2>

                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Access your membership dashboard, explore the national stamp collection,
                        and connect with the Bangladesh philatelic community.
                    </p>

                    <div className="mt-12 pt-12 border-t border-white/5 flex justify-center gap-8 text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
                        <span>Philately</span>
                        <span className="text-[#26bba4]">•</span>
                        <span>Heritage</span>
                        <span className="text-[#26bba4]">•</span>
                        <span>Community</span>
                    </div>
                </div>

                <div className="absolute top-12 right-12 w-24 h-24 border border-white/5 rounded-full" />
                <div className="absolute bottom-24 left-12 w-12 h-12 border border-[#26bba4]/20 rounded-lg rotate-12" />
            </div>

            {/* Right Side: Login Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-6">
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 text-center lg:text-left"> Sign In</h1>
                        <p className="text-slate-500 mt-2 text-center lg:text-left">Enter your credentials to access the BNPA dashboard.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Registered Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                                    <Input
                                        type="email"
                                        placeholder="member@bnpa.org"
                                        {...register("email", { required: "Email is required" })}
                                        className={`pl-10 h-12 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#26bba4] hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Minimum 6 characters" }
                                        })}
                                        className={`pl-10 h-12 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-[#26bba4] hover:bg-[#1f9683] text-white font-bold text-lg rounded-xl shadow-lg transition-all"
                        >
                            {isSubmitting ? "Verifying..." : "Access Portal"}
                            {!isSubmitting && <ArrowRight className="ml-2" size={18} />}
                        </Button>

                        <p className="text-center text-slate-600 text-sm">
                            Don't have an account?{' '}

                            <Link to="/register" className="text-[#26bba4] font-bold hover:underline">

                                Create an account

                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}