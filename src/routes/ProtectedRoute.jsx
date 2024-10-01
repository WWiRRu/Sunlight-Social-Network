import {Navigate, redirect, useLoaderData} from "react-router-dom";
import api from "../services/api.js";
export const protectedRouteLoader = async () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key.trim()] = decodeURIComponent(value);
        return acc;
    }, {});
    const token = cookies.token;
    const user = cookies.user ? JSON.parse(cookies.user) : null;

    if (!token || !user) {
        return redirect("/login");
    }

    return user;
};
const ProtectedRoute = ({ children }) => {
    const user = useLoaderData();
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};



export default ProtectedRoute;