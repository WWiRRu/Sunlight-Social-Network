import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SimpleErrorPage from './pages/SimpleErrorPage.jsx';
import NormalLayout from './layouts/NormalLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import ProtectedRoute, { protectedRouteLoader } from './routes/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { UserProvider } from './context/UserContext.jsx';
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage, {profileLoader} from "./pages/ProfilePage.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import Dashboard from "./pages/DashboardPage.jsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <NormalLayout />,
            errorElement: <SimpleErrorPage />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    ),
                    loader: protectedRouteLoader,
                },
                {
                    path: "profile/:id",
                    element: (
                        <ProtectedRoute>
                            <ProfilePage/>
                        </ProtectedRoute>
                    ),
                    loader: profileLoader,
                },
                {
                    path: "dashboard",
                    element: (
                        <AdminRoute>
                            <Dashboard/>
                        </AdminRoute>
                    ),
                }
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
            errorElement: <SimpleErrorPage />,
        },
        {
            path: "/register",
            element: <RegisterPage/>,
            errorElement: <SimpleErrorPage />,
        }
    ]);

    return (
        <UserProvider>
            <DarkModeProvider>
                <RouterProvider router={router} />
            </DarkModeProvider>
        </UserProvider>
    );
};

export default App;
