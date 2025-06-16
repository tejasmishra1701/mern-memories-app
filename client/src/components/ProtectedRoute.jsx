import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    
    if (!token) {
        return <Navigate to="/auth/login" />;
    }
    
    return children;
};

export default ProtectedRoute;