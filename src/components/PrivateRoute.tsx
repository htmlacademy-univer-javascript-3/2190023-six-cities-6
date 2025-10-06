import React from "react";
import { Navigate } from 'react-router';

type PrivateRouteProps = {
    children: React.ReactNode;
    isAuthorized: boolean;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthorized }) => {
    return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}