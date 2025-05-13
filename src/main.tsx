import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AuthPage from './pages/Auth/AuthPage.tsx'
import Main from './pages/Main/MainPage.tsx'
import PrivateRoute from './security/PrivateRoute.tsx'
import PublicRoute from "./security/PublicRoute.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
         ),
    },
    {
        path: "/auth",
        element: (
            <PublicRoute>
                <AuthPage />
            </PublicRoute>
        ),
    },
    // {
    //     path: "/private/*",
    //     element: (
    //         <PrivateRoute>
    //             <Main />
    //         </PrivateRoute>
    //     ),
    // },
    // {
    //     path: "/group/*",
    //     element: (
    //         <PrivateRoute>
    //             <Main />
    //         </PrivateRoute>
    //     ),
    // }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
