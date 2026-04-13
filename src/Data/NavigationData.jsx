import useAuth from "@/components/Hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCheck, FileText, LayoutDashboard, LogOut, PlusCircle, Settings, ShieldCheck, User, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useRole from "@/components/Hooks/useRole";






export const UserAuthSection = ({ isMobile = false }) => {

    const { user, logOut } = useAuth()
    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        <Avatar className="h-10 w-10 border-2 border-slate-100 hover:border-[#26bba4] transition-all">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="bg-slate-100 text-slate-600">
                                {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground italic">Member</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link className="flex items-center" to={"/dashboard"}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>

                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                        <div className="flex items-center" onClick={() => logOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button
            asChild
            className={`${isMobile ? 'w-full mt-4' : ''} bg-[#26bba4] hover:bg-[#1f9683] text-white rounded-full px-6 transition-all active:scale-95`}
        >
            <Link to="/login">Login</Link>
        </Button>
    );
};




// const menuItems = [

  
//     { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
//     { name: 'Manage Users', path: '/dashboard/manage-users', icon: Users },
//     { name: 'Reports', path: '/dashboard/reports', icon: FileText },
//     { name: 'Admin Settings', path: '/dashboard/settings', icon: Settings },
// ];

export const SidebarContent = ({ setOpen }) => {
    
    const pathname = useLocation()
    const { user, logOut } = useAuth()
    const { role } = useRole()
    
    console.log("im ",role)
    return (



        <div className="flex h-full flex-col bg-slate-950 text-white">
            {/* Branding Header */}
            <div className="flex h-18  mx-auto items-center border-b border-slate-800 px-6">
                <Link to="/" className="flex items-center text-center space-x-2">
                    <h1 className="text-5xl text-[#26bba4] font-bold">B N P A</h1>
                </Link>
                
            </div>

            <ScrollArea className="flex-1 px-4 py-6">
                <div className="space-y-6">
                    {/* Main Navigation */}
                    <div>
                        <h4 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Platform
                        </h4>
                        <div className="space-y-1">
                            <Button
                                key={"/dashboard"}
                                asChild
                                variant="ghost"
                                onClick={() => setOpen(false)} // Close drawer on mobile click
                                className={cn(
                                    "w-full justify-start gap-3 rounded-lg px-3 py-6 transition-all",
                                    pathname === "/dashboard"
                                        ? "bg-[#26bba4] text-white hover:bg-[#1f9683] shadow-lg shadow-emerald-900/20"
                                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                )}
                            >
                                <Link to={"/dashboard"}>
                                    <LayoutDashboard className={cn("h-5 w-5", pathname === '/dashboard' ? "text-white" : "text-slate-400")} />
                                    <span className="text-sm font-medium">Overview</span>
                                </Link>
                            </Button>
                           
                            
                           

                            {role === "admin" ? <>
                                
                                <Button
                                    key={"/dashboard/manage-users"}
                                    asChild
                                    variant="ghost"
                                    onClick={() => setOpen(false)} // Close drawer on mobile click
                                    className={cn(
                                        "w-full justify-start gap-3 rounded-lg px-3 py-6 transition-all",
                                        pathname === "/dashboard/manage-users"
                                            ? "bg-[#26bba4] text-white hover:bg-[#1f9683] shadow-lg shadow-emerald-900/20"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    )}
                                >
                                    <Link to={"/dashboard/manage-users"}>
                                        <Users className={cn("h-5 w-5", pathname === '/dashboard/manage-users' ? "text-white" : "text-slate-400")} />
                                        <span className="text-sm font-medium">Manage Users</span>
                                    </Link>
                                </Button>



                            </>  :  <>
                                
                                    <Button
                                        key={"/dashboard/membership"}
                                        asChild
                                        variant="ghost"
                                        onClick={() => setOpen(false)} // Close drawer on mobile click
                                        className={cn(
                                            "w-full justify-start gap-3 rounded-lg px-3 py-6 transition-all",
                                            pathname === "/dashboard/membership"
                                                ? "bg-[#26bba4] text-white hover:bg-[#1f9683] shadow-lg shadow-emerald-900/20"
                                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                        )}
                                    >
                                        <Link to={"/dashboard/membership"}>
                                            <FileCheck className={cn("h-5 w-5", pathname === '/dashboard/membership' ? "text-white" : "text-slate-400")} />
                                            <span className="text-sm font-medium">Membership</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={"/dashboard/new-issue"}
                                        asChild
                                        variant="ghost"
                                        onClick={() => setOpen(false)} // Close drawer on mobile click
                                        className={cn(
                                            "w-full justify-start gap-3 rounded-lg px-3 py-6 transition-all",
                                            pathname === "/dashboard/new-issue"
                                                ? "bg-[#26bba4] text-white hover:bg-[#1f9683] shadow-lg shadow-emerald-900/20"
                                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                        )}
                                    >
                                        <Link to={"/dashboard/new-issue"}>
                                            <FileCheck className={cn("h-5 w-5", pathname === '/dashboard/new-issue' ? "text-white" : "text-slate-400")} />
                                            <span className="text-sm font-medium">New Issue</span>
                                        </Link>
                                    </Button>
                              
                            </>
                            }   
                          
                        </div>
                    </div>

                    {/* Management Section */}
                    <div>
                        <h4 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Management
                        </h4>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:bg-slate-900 hover:text-white px-3 py-6">
                            <PlusCircle size={20} />
                            <span className="text-sm font-medium">Add New User</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:bg-slate-900 hover:text-white px-3 py-6">
                            <ShieldCheck size={20} />
                            <span className="text-sm font-medium">Permissions</span>
                        </Button>
                    </div>
                </div>
            </ScrollArea>

            {/* User Profile Section */}
            <div className="mt-auto border-t border-slate-800 p-4">
                <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-white/5 border border-white/5">
                    <Avatar className="h-9 w-9 border border-emerald-500/50">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-emerald-950 text-emerald-400">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold truncate leading-none">{ role} User</p>
                        <p className="text-[10px] text-slate-500 truncate mt-1">{user?.email }</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400">
                        <LogOut size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}