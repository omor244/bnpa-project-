import DashboardSidebar from "@/DashboardComponets/DashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router";

const DashboardLayOut = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Main Grid Container:
                - Mobile: 1 Column (Sidebar top bar + Content below)
                - Laptop (lg): 12 Columns
            */}
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">

                {/* 1. Sidebar Column 
                    The Sidebar component handles its own fixed/drawer behavior.
                */}
                <DashboardSidebar />

                {/* 2. Content Column 
                    - pt-20 on mobile to account for the fixed top bar.
                    - pt-0 on laptop/desktop because the sidebar is on the left.
                */}
                <main className="w-full pt-20 lg:pt-0">
                    <div className="p-4 md:p-6 lg:p-10">
                        {/* Inner wrapper to keep content from hitting edges 
                            on massive displays (Ultrawide monitors)
                        */}
                        <div className="max-w-[1600px] mx-auto">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayOut;