import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;