
import {  handleDeleteUser, handleStatusUpdate } from '@/Data/GetAllData/GetUserData';
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const ManageUsers = () => {
   

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get("https://bnpa-mysql.vercel.app/users");
            return {data}; // Returning data directly for cleaner mapping
        }
    });


    console.log(users)
    
    if (isLoading) return <LoadingPage />
  



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage roles, approval status, and account access.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1">Total Users: {users?.data.length}</Badge>
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
                        {users.data?.map((user) => (
                            <TableRow key={user.id} className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">{user.name}</span>
                                        {/* <span className="text-xs text-slate-500 font-mono">{user?.id.slice(3)}</span> */}
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
                                        defaultValue={user?.status}
                                        onValueChange={(value) => handleStatusUpdate(user.id, value, refetch)}
                                    >
                                        <SelectTrigger className={cn(
                                            "w-[130px] h-9 text-xs font-semibold uppercase",
                                            user.status === 'approve' ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent defaultValue="pending">
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
                                        onClick={() => handleDeleteUser(user.id, refetch)}
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