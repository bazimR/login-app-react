import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// auth middleware 
import { AdminAcess, AdminLogin, AuthorizeUser, ProtectRoute } from './middleware/auth';

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Pagenotfound from './components/Pagenotfound';
import Loginadmin from './components/Loginadmin';
import Adminhome from './components/Adminhome';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '/admin/',
        element: <AdminLogin><Loginadmin /></AdminLogin>
    },
    {
        path: '/admin/home',
        element: <AdminAcess><Adminhome /></AdminAcess>
    },
    {
        path: '*',
        element: <Pagenotfound></Pagenotfound>
    },

])
const App = () => {
    return (
        <main>
            <RouterProvider router={router}>

            </RouterProvider>
        </main>
    )
}

export default App