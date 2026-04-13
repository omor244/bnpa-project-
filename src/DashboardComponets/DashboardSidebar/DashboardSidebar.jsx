import { useState } from 'react';




import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components
import Logo from "@/components/Logo/Logo";
import { SidebarContent } from '@/Data/NavigationData';
import { Menu } from 'lucide-react';



export default function DashboardSidebar() {
   
   const [open, setOpen] = useState(false);

  
   

    return (
        <>
            {/* Mobile Trigger Bar (Visible only on small screens) */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 text-white w-full fixed top-0 z-50">
                <Logo className="h-6 w-auto" />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 bg-slate-950 border-r-slate-800">
                        <SidebarContent setOpen={setOpen} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar (Hidden on mobile) */}
            <aside className="hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 border-r border-slate-800">
                <SidebarContent setOpen={setOpen} />
            </aside>

            {/* Spacer for Desktop (Optional: helps keep main content from going under fixed sidebar) */}
            <div className="hidden lg:block w-64 flex-shrink-0" />

            {/* Spacer for Mobile (Prevents content from being hidden under the fixed top bar) */}
            <div className="lg:hidden h-16" />
        </>
    );
}