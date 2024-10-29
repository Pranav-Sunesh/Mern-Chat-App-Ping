import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Protected from "./Protected";
import Loading from "@/pages/Loading";

const Error404 = lazy(() => import('../pages/Error404'));
const Chat = lazy(() => import('../pages/Chat'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

const lazyLoad = (Component: React.LazyExoticComponent<React.FC>) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
)

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: lazyLoad(Error404)
        
    },
    {
        path: '/protected',
        element: <Protected />,
        children: [
            {
                path: '/protected/chat',
                element: lazyLoad(Chat)
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