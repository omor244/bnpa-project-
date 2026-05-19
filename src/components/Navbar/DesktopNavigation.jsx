import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserAuthSection } from "@/Data/NavigationData";
import { ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router";
const DesktopNavigation = ({ navLinks, cartCount}) => {
    return (
        <div>
            <div className="hidden lg:flex items-center space-x-2">
                <nav className="flex items-center">
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
                                                <ul className="grid w-60 gap-1 p-3 bg-white shadow-xl border rounded-xl">
                                                    {link.subLinks.map((sub) => (
                                                        <li key={sub.name}>
                                                            <NavigationMenuLink asChild>
                                                                <NavLink
                                                                    to={sub.href}
                                                                    className={({ isActive }) => `
                                                                                block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all 
                                                                                ${isActive ? "bg-[#26bba4]/10 text-[#26bba4] font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-[#26bba4]"}
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

                {/* --- CART ICON (DESKTOP) --- */}
                <Link to="/cart" className="relative p-2 ml-2 text-slate-600 hover:text-[#26bba4] transition-colors">
                    <ShoppingCart size={22} strokeWidth={2.5} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <div className="ml-4 pl-4 border-l border-slate-100 h-8 flex items-center">
                    <UserAuthSection />
                </div>
            </div>
        </div>
    );
};

export default DesktopNavigation;