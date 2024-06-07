import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from './components/Home';
import { Settings } from './components/Settings';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { MainLayout } from './components/MainLayout';
import { Toaster } from 'sonner';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
)
