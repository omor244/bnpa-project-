import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, User, Hash, Image as ImageIcon, Upload, X, FileWarning } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toast } from '@/Data/Data';
import { Imageupload } from '@/lib/utils';
import useAxiosSecure from '@/components/Hooks/useAxiosSecure';

export default function NewIssuePage() {
    const [preview, setPreview] = useState(null);
    const axiosSecure = useAxiosSecure()
    // 1. Added setValue to useForm to manually update the form state
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeKB = file.size / 1024;
            const MAX_KB = 3000;
            if (fileSizeKB > MAX_KB) {
                Toast.fire({
                    icon: 'warning',
                    title: 'File Too Large',
                    text: `Image must be less than ${MAX_KB} KB (3MB).`,
                });
                e.target.value = null;
                setPreview(null);
                setValue("image", null); // Clear from form data
                return;
            }

            // 2. This connects the file to your "data" object in onSubmit
            setValue("image", file);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        // "data.image" will now contain the File object
        console.log("Submitting BNPA Issue:", data);
        const { title, dateOfIssue, designer, image, postmarkNumber } = data


        const uploadedimage = await Imageupload(image)

        const issuseData = {
            title,
            dateOfIssue,
            designer,
            image: uploadedimage,
            postmarkNumber
        }

        console.log(issuseData)

        try {

            const res = await axiosSecure.post("/new-issue", issuseData)

            console.log(res.data)
            if (res.data.insertedId) {

                Toast.fire({
                    icon: 'success',
                    title: 'Issue Published',
                    text: 'The new philatelic issue has been added to BNPA records.',
                    timer: 2000
                });

                reset();
                setPreview(null);
            }


        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Error saving issue' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">New Issue</h1>
                    <p className="text-slate-500">Bangladesh National Philatelic Association Archive</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col xl:flex-row gap-8">

                        {/* Left Side: Form Fields */}
                        <div className="flex-1 space-y-6">
                            <Card className="border-slate-200 shadow-sm">
                                <CardContent className="pt-6 space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Title of Issue</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                                            <Input
                                                {...register("title", { required: "Title is required" })}
                                                placeholder="e.g., Golden Jubilee of Independence"
                                                className="pl-10 h-11 focus-visible:ring-[#26bba4]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Date of Issue</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                                            <Input
                                                type="date"
                                                {...register("dateOfIssue", { required: "Date is required" })}
                                                className="pl-10 h-11 focus-visible:ring-[#26bba4]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-slate-700">Designer</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                                <Input
                                                    {...register("designer", { required: "Designer is required" })}
                                                    placeholder="Artist Name"
                                                    className="pl-10 h-11 focus-visible:ring-[#26bba4]"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-slate-700">Number of Postmark</label>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-3 text-slate-400" size={18} />
                                                <Input
                                                    type="number"
                                                    {...register("postmarkNumber", { required: true })}
                                                    placeholder="0"
                                                    className="pl-10 h-11 focus-visible:ring-[#26bba4]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => { reset(); setPreview(null); }}
                                    className="px-6"
                                >
                                    Clear Form
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    className="px-10 h-12 bg-[#26bba4] hover:bg-[#1f9683] text-white font-bold rounded-xl shadow-md transition-all"
                                >
                                    {isSubmitting ? "Processing..." : "Publish to BNPA"}
                                </Button>
                            </div>
                        </div>

                        {/* Right Side: Photo Upload */}
                        <div className="xl:w-[540px] shrink-0">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-3 border-b bg-slate-50/50">
                                    <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500">
                                        Issue Image (500px Preview)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex justify-center">
                                        {preview ? (
                                            <div className="relative border-4 border-white shadow-xl rounded-lg overflow-hidden group">
                                                <img
                                                    src={preview}
                                                    alt="Stamp Preview"
                                                    style={{ width: '500px', height: 'auto' }}
                                                    className="block transition-transform duration-300 group-hover:scale-[1.02]"
                                                />
                                                <button
                                                    type="button"

                                                    onClick={() => {
                                                        setPreview(null);
                                                        setValue("image", null); // Clear from form data
                                                    }}
                                                    className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-all shadow-lg"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-[500px] aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-[#26bba4] transition-all cursor-pointer">
                                                <div className="text-center p-10">
                                                    <Upload className="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-[#26bba4]" />
                                                    <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">Click to Upload</p>
                                                    <p className="text-xs text-slate-400 mt-2">Max Size: 3000 KB (3MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    required
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
                                        <FileWarning className="text-amber-600 mt-0.5" size={18} />
                                        <p className="text-[12px] text-amber-800 leading-relaxed font-medium">
                                            High-resolution scans preferred for the BNPA archive.
                                            Ensure the file size is under 3000 KB.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
