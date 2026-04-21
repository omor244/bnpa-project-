import { Link, NavLink } from "react-router";
import { Menu, ChevronDown } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

export default function Navbar() {
    const { user } = useAuth();

    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-slate-100">
            <div className="lg:max-w-[92%] lg:mx-auto">
                <div className="flex h-20 items-center justify-between px-4 lg:px-0">

                    {/* Logo Section - Large Screens */}
                    <div className="shrink-0 hidden lg:block">
                        <Logo />
                    </div>

                    {/* BNPA Text - Mobile Screens */}
                    <div className="flex h-18 lg:hidden">
                        <Link to="/" className="flex items-center text-center space-x-2">
                            <h1 className="text-4xl sm:text-5xl text-[#26bba4] font-bold">B N P A</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <nav className="flex items-center">
                            {/* NavigationMenu wrapper must handle the relative positioning for the content */}
                            <NavigationMenu className="relative z-10" viewport={false}>
                                <NavigationMenuList className="flex flex-row gap-1 list-none">
                                    {navLinks.map((link) => (
                                        <NavigationMenuItem key={link.name}>
                                            {link.subLinks ? (
                                                <>
                                                    <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-[#26bba4] bg-transparent transition-colors focus:bg-transparent data-[state=open]:bg-transparent">
                                                        {link.name}
                                                    </NavigationMenuTrigger>

                                                    <NavigationMenuContent className={"absolute top-full left-0 mt-2"}>
                                                        <ul className="grid w-60 gap-1 p-3 bg-white">
                                                            {link.subLinks.map((sub) => (
                                                                <li key={sub.name}>
                                                                    <NavigationMenuLink asChild>
                                                                        <NavLink
                                                                            to={sub.href}
                                                                            className={({ isActive }) => `
                                        block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all 
                                        ${isActive
                                                                                    ? "bg-[#26bba4]/10 text-[#26bba4] font-bold"
                                                                                    : "text-slate-600 hover:bg-slate-50 hover:text-[#26bba4]"}
                                      `}
                                                                        >
                                                                            {sub.name}
                                                                        </NavLink>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                <NavLink
                                                    to={link.href}
                                                    className={({ isActive }) =>
                                                        `px-4 py-2 text-sm font-semibold transition-all rounded-full hover:text-[#26bba4] 
                            ${isActive ? "text-[#26bba4] bg-[#26bba4]/5" : "text-slate-600"}`
                                                    }
                                                >
                                                    {link.name}
                                                </NavLink>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>

                        {/* Auth Section */}
                        <div className="ml-4 pl-4 border-l border-slate-100 h-8 flex items-center">
                            <UserAuthSection />
                        </div>
                    </div>

                    {/* Mobile Drawer */}
                    <div className="lg:hidden flex items-center gap-3">
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