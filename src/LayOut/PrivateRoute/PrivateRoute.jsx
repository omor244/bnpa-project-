import useAuth from '@/components/Hooks/useAuth';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if(loading) return <LoadingPage/>

    if (user) return children;

    return <Navigate to="/login" replace />;
};

export default PrivateRoute;