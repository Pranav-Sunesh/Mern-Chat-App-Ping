import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Protected from "./Protected";
import Loading from "@/pages/Loading";
import Layout from "@/Layout";

const Error404 = lazy(() => import('../pages/Error404'));
const Chat = lazy(() => import('../pages/Chat'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Profile = lazy(() => import('../pages/Profile'));
const ProfileEdit = lazy(() => import('../pages/ProfileEdit'));

const lazyLoad = (Component: React.LazyExoticComponent<React.FC>) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/protected/chat" replace />,
        errorElement: lazyLoad(Error404)
        
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/protected',
                element: <Protected />,
                children: [
                    {
                        path: '/protected/chat',
                        element: lazyLoad(Chat)
                    },
                    {
                        path: 'profile',
                        element: lazyLoad(Profile)
                    },
                    {
                        path: 'profile/edit',
                        element: lazyLoad(ProfileEdit)
                    }
                ]
            }
        ]

    },
    {
        path: '/login',
        element: lazyLoad(Login)
    },
    {
        path: '/signup',
        element: lazyLoad(Signup)
    }
])

export default router;