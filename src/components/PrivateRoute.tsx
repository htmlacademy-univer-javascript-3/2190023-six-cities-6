import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { AuthorizationStatus } from "../store/auth-slice";
import { Navigate } from 'react-router';
import { Spinner } from "./Spinner";

type PrivateRouteProps = {
    children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authorizedStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

    if (authorizedStatus === AuthorizationStatus.Unknown) {
        return <div><span>Проверка авторизации...</span><Spinner /></div>
    }

    if (authorizedStatus !== AuthorizationStatus.Authorized) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}