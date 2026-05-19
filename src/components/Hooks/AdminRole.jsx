

import { Navigate } from 'react-router';
import useRole from './useRole';
import useAuth from './useAuth';
import LoadingPage from '../LoadingPage/LoadingPage';

const AdminRole = ({ children }) => {
    const { user, loading } = useAuth()
    const { role } = useRole()
    // console.log(role)

    if (loading) return <LoadingPage></LoadingPage>

    if (user && role == "admin") return children
    return <Navigate to="/" replace />;
};

export default AdminRole;