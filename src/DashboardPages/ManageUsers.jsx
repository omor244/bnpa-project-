
import { GetAllUserData, handleDeleteUser, handleStatusUpdate } from '@/Data/GetAllData/GetUserData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, UserCheck, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import LoadingPage from '@/components/LoadingPage/LoadingPage';


const ManageUsers = () => {
   
    const initialUsers = GetAllUserData();
    
    
    // if (initialUsers.isLoading) return <LoadingPage/>
  



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage roles, approval status, and account access.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1">Total Users: {initialUsers?.data?.length}</Badge>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[200px]">User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialUsers?.data?.map((user) => (
                            <TableRow key={user._id} className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">{user.name}</span>
                                        <span className="text-xs text-slate-500 font-mono">{user._id.slice(-6)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center gap-1 text-slate-600">
                                            <span>{user.email}</span>
                                        </div>
                                        <span className="text-slate-400 text-xs">{user.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="capitalize flex w-fit items-center gap-1">
                                        {user.role === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.status}
                                        onValueChange={(value) => handleStatusUpdate(user._id, value, initialUsers.refetch)}
                                    >
                                        <SelectTrigger className={cn(
                                            "w-[130px] h-9 text-xs font-semibold uppercase",
                                            user.status === 'approve' ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="padding">Pending</SelectItem>
                                            <SelectItem value="approve">Approved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-slate-400 hover:text-red-600 cursor-pointer hover:bg-red-50"
                                        onClick={() => handleDeleteUser(user._id, initialUsers.refetch)}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

// Helper function for tailwind classes (standard in Shadcn projects)
function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

    export default ManageUsers;