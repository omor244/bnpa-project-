

const LoadingPage = () => {
    
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <div className="relative flex flex-col items-center">

                {/* Logo Container with Pulse Animation */}
                <div className="mb-8 animate-pulse">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-[#26bba4] rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xl">B</span>
                        </div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tighter">
                            BNPA
                        </span>
                    </div>
                </div>

                {/* Progress Bar Track */}
                <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                    {/* Animated Progress Fill */}
                    <div className="h-full bg-[#26bba4] animate-loading-bar rounded-full" />
                </div>

                {/* Status Text */}
                <p className="mt-4 text-slate-400 text-xs uppercase tracking-[0.2em] font-medium animate-pulse">
                    Loading Experience
                </p>
            </div>

            {/* Tailwind Custom Keyframes (Add these to your tailwind.config.js if not working) */}
            <style jsx>{`
                @keyframes loading-bar {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 50%; transform: translateX(0%); }
                    100% { width: 100%; transform: translateX(100%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;