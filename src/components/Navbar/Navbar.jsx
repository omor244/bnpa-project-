import {  NavLink } from "react-router";
import { Menu} from "lucide-react";
import { NavigationMenu,NavigationMenuContent,NavigationMenuItem, NavigationMenuLink,NavigationMenuList, NavigationMenuTrigger,} from "@/components/ui/navigation-menu";
import {Sheet,SheetContent,SheetHeader,SheetTitle, SheetTrigger,} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Logo from "../Logo/Logo";
import { navLinks } from "@/Data/Data";
import useAuth from "../Hooks/useAuth";
import { UserAuthSection } from "@/Data/NavigationData";

export default function Navbar() {
   
    const { user} = useAuth() 

    console.log(user)
   

    return (
        <header className="w-full bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <nav className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {navLinks.map((link) => (
                                        <NavigationMenuItem key={link.name}>
                                            {link.subLinks ? (
                                                <>
                                                    <NavigationMenuTrigger className="text-sm font-medium text-slate-600 hover:text-[#26bba4] bg-transparent">
                                                        {link.name}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid w-[200px] gap-2 p-4">
                                                            {link.subLinks.map((sub) => (
                                                                <li key={sub.name}>
                                                                    <NavigationMenuLink asChild>
                                                                        <NavLink
                                                                            to={sub.href}
                                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-[#26bba4]"
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
                                                        `px-3 py-2 text-sm font-medium transition-colors hover:text-[#26bba4] ${isActive ? "text-[#26bba4]" : "text-slate-600"}`
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

                        {/* Desktop Auth Section */}
                        <div className="pl-4 border-l cursor-pointer border-slate-100">
                            <UserAuthSection />
                        </div>
                    </div>

                    {/* Mobile/Tablet Controls */}
                    <div className="lg:hidden flex items-center gap-4">
                        {/* Show avatar next to menu on mobile if logged in */}
                        {user && <UserAuthSection isMobile={false} />}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-600">
                                    <Menu className="h-8 w-8" strokeWidth={2.5} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px]">
                                <SheetHeader className="border-b pb-4 text-left">
                                    <SheetTitle className="text-[#26bba4]">Navigation</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col space-y-1 mt-6">
                                    {navLinks.map((link) => (
                                        <div key={link.name} className="flex flex-col">
                                            <NavLink
                                                to={link.href}
                                                className={({ isActive }) =>
                                                    `text-base font-medium p-2 rounded-md transition-colors ${isActive ? "bg-slate-50 text-[#26bba4]" : "text-slate-700 hover:bg-slate-50"}`
                                                }
                                            >
                                                {link.name}
                                            </NavLink>
                                            {link.subLinks && (
                                                <div className="ml-4 mt-1 flex flex-col space-y-1 border-l-2 border-slate-100 pl-4">
                                                    {link.subLinks.map((sub) => (
                                                        <NavLink
                                                            key={sub.name}
                                                            to={sub.href}
                                                            className="text-sm py-2 text-slate-500 hover:text-[#26bba4]"
                                                        >
                                                            {sub.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Mobile Login Button (only if not logged in) */}
                                    {!user && <UserAuthSection isMobile={true} />}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}