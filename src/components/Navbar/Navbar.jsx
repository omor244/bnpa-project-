import { Link, NavLink } from "react-router";
import { Menu, ChevronDown, ShoppingCart } from "lucide-react"; // Added ShoppingCart
import axios from "axios"; // Added for fetching

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "../Logo/Logo";
import { navLinks } from "@/Data/Data";
import useAuth from "../Hooks/useAuth";
import { UserAuthSection } from "@/Data/NavigationData";
import DesktopNavigation from "./DesktopNavigation";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
    const { user } = useAuth();
   

    const { data: cartItems, isLoading } = useQuery({
        
        queryKey: ['cart-items-in-nav', user?.email, localStorage.getItem('guest_cart_id')],

        queryFn: async () => {
            // Re-check the ID right when the function runs
            const currentGuestId = localStorage.getItem('guest_cart_id');
            const identifier = user?.email || currentGuestId;

            if (!identifier) return { data: [] };

            const { data } = await axios.get(`https://data.bnpa.bd/add-cart?email=${identifier}`);
            return data;
        },

        // Re-check the ID for the 'enabled' logic
        enabled: !!(user?.email || localStorage.getItem('guest_cart_id')),
        refetchOnWindowFocus: true, // Optional: updates if they come back to the tab
        retry: false
    });

    // 2. Ensure your cartCount handles the data structure correctly
    // Using ?. to prevent "cannot read property length of undefined"
    const cartCount = cartItems?.data?.length || cartItems?.length || 0;

    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-slate-100">
            <div className="lg:max-w-[92%] lg:mx-auto">
                <div className="flex h-20 items-center justify-between px-4 lg:px-0">

                    {/* Logo Section */}
                    <div className="shrink-0 hidden lg:block">
                        <Logo />
                    </div>

                    <div className="flex h-18 lg:hidden">
                        <Link to="/" className="flex items-center text-center space-x-2">
                            <h1 className="text-4xl sm:text-5xl text-[#26bba4] font-bold">B N P A</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <DesktopNavigation navLinks={navLinks} cartCount={cartCount} />

                    {/* Mobile Drawer */}
                    <div className="lg:hidden flex items-end gap-3">
                        {/* --- CART ICON (MOBILE) --- */}
                        <Link to="/cart" className="relative p-2 text-slate-600">
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user && <UserAuthSection isMobile={false} />}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-[#26bba4]/5 text-slate-900">
                                    <Menu className="h-7 w-7" strokeWidth={2} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[320px] p-0">
                                <div className="p-6">
                                    <SheetHeader className="border-b pb-6 mb-6 text-left">
                                        <SheetTitle className="text-[#26bba4] font-black text-2xl tracking-tight">BNPA MENU</SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col space-y-2">
                                        {navLinks.map((link) => (
                                            <div key={link.name} className="flex flex-col">
                                                <NavLink
                                                    to={link.href}
                                                    className={({ isActive }) =>
                                                        `text-base font-bold p-3 rounded-xl transition-all flex items-center justify-between
                                                        ${isActive ? "bg-[#26bba4] text-white" : "text-slate-800 hover:bg-slate-100"}`
                                                    }
                                                >
                                                    {link.name}
                                                    {link.subLinks && <ChevronDown size={16} className="opacity-50" />}
                                                </NavLink>
                                                {link.subLinks && (
                                                    <div className="ml-4 mt-2 mb-2 flex flex-col space-y-1 border-l-2 border-[#26bba4]/20 pl-4">
                                                        {link.subLinks.map((sub) => (
                                                            <NavLink
                                                                key={sub.name}
                                                                to={sub.href}
                                                                className={({ isActive }) => `
                                                                    text-sm py-2.5 font-medium transition-colors
                                                                    ${isActive ? "text-[#26bba4] font-bold" : "text-slate-500 hover:text-[#26bba4]"}
                                                                `}
                                                            >
                                                                {sub.name}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div className="pt-6 mt-6 border-t border-slate-100">
                                            {!user && <UserAuthSection isMobile={true} />}
                                        </div>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
}