import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, User, Mail, MapPin, Phone, CreditCard, CheckCircle2 } from 'lucide-react';
import { handleImageChange} from '@/Data/MembershipData';
import { Imageupload } from '@/lib/utils';
import useAxiosSecure from '@/components/Hooks/useAxiosSecure';
import { Toast } from '@/Data/Data';


const MembershipForm = () => {
    const [preview, setPreview] = useState({ profile: null, card: null });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure() 
   
    const onSubmit = async (data) => {

      
        const { address, cardPic, fullName, email, nid, memberType, mobile, profilePic } = data

        const cardImageFile = cardPic[0]
        const profileImageFile = profilePic[0]
        const uploadCardImage = await Imageupload(cardImageFile)
        const uploadProfileImage = await Imageupload(profileImageFile)
        console.log("image", uploadCardImage, uploadProfileImage)


        const MemberFormData = {
            address,
            cardImage: uploadCardImage,
            fullName,
            email: email,
            nid,
            memberType,
            mobile,
            profileImage: uploadProfileImage
        }

      

        const res = await axiosSecure.post("/membership", MemberFormData)

        if (res.data.insertedId) {
        
            Toast.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: 'Your BNPA membership request is being processed.',
                background: '#ffffff',
                iconColor: '#26bba4',
                customClass: {
                    title: 'text-slate-800 font-bold',
                    popup: 'rounded-2xl shadow-xl border border-slate-100'
                }
            });
            reset();
            setPreview({ profile: null, card: null })
        }
    };
   
  

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                    {/* Header */}
                    <div className="bg-[#26bba4] p-8 text-white text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-tight">BNPA Membership Form</h2>
                        <p className="opacity-90 mt-2 font-light">Join the Bangladesh National Philatelic Association</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">

                        {/* Section 1: Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <User size={16} className="text-[#26bba4]" /> Full Name
                                </label>
                                <input
                                    {...register("fullName", { required: "Name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Phone size={16} className="text-[#26bba4]" /> Mobile Number
                                </label>
                                <input
                                    {...register("mobile", { required: "Mobile number is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="+880"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Mail size={16} className="text-[#26bba4]" /> Email Address
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="example@mail.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <CreditCard size={16} className="text-[#26bba4]" /> NID Number
                                </label>
                                <input
                                    {...register("nid", { required: "NID is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                    placeholder="National ID Number"
                                />
                            </div>
                        </div>

                        {/* Section 2: Address & Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <MapPin size={16} className="text-[#26bba4]" /> Postal Address
                            </label>
                            <textarea
                                {...register("address", { required: "Address is required" })}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26bba4] outline-none transition-all"
                                placeholder="Full mailing address"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">Membership Type</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" value="Life Member" {...register("memberType")} className="w-4 h-4 accent-[#26bba4]" defaultChecked />
                                    <span className="text-slate-600 group-hover:text-[#26bba4]">Life Member</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" value="Yearly Member" {...register("memberType")} className="w-4 h-4 accent-[#26bba4]" />
                                    <span className="text-slate-600 group-hover:text-[#26bba4]">Yearly Member</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 3: File Uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

                            {/* Profile Picture */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700">1. Profile Picture <sup>( Mandatory )</sup> </label>
                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative overflow-hidden">
                                    {preview.profile ? (
                                        <img src={preview.profile} alt="Preview" className="h-32 w-32 object-cover rounded-full border-4 border-white shadow-md" />
                                    ) : (
                                        <>
                                            <Upload className="text-slate-400 mb-2" size={32} />
                                            <span className="text-xs text-slate-500">Click to upload (Max 5MB)</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        required
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        {...register("profilePic")}
                                        onChange={(e) => handleImageChange(e, 'profile', setPreview)}
                                    />
                                </div>
                            </div>

                            {/* Membership Card Photo */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700">2. Membership Card / ID Document <sup>( Mandatory )</sup> </label>
                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative overflow-hidden">
                                    {preview.card ? (
                                        <img src={preview.card} alt="Preview" className="h-32 w-full object-contain rounded-lg shadow-sm" />
                                    ) : (
                                        <>
                                            <Upload className="text-slate-400 mb-2" size={32} />
                                            <span className="text-xs text-slate-500">Upload Membership Card Photo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        {...register("cardPic")}
                                        onChange={(e) => handleImageChange(e, 'card', setPreview)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#26bba4] cursor-pointer text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1f9d8a] transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-lg"
                        >
                            <CheckCircle2 size={22} />
                            Submit Membership Application
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default MembershipForm;