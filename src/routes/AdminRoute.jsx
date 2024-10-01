import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

const AdminRoute = ({ children }) => {
    const { user } = useUser();
    if(!user){
        return <Navigate to="/login" />;
    }
    if (!user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
