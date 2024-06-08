import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import AuthRoutes from './components/AuthRoutes';
import ProtectRoutes from './components/ProtectRoutes';

import './index.css'
import { HomePage } from './components/page/Home';
import { Settings } from './components/page/Settings';
import { SignUp } from './components/page/SignUp';
import { Login } from './components/page/Login';

import { Toaster } from 'sonner';
import { NavBar } from './components/layout/NavBar';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <div className="flex min-h-screen w-full flex-col">
        <Router>
          <NavBar />
          <Routes>

            {/* all routes in here redirect to '/login' if is not login */}
            <Route element={<ProtectRoutes />}>
              <Route element={<Settings/>} path="/settings" />
            </Route>

            {/* all routes in here redirect to '/' if is login  */}
            <Route element={<AuthRoutes />}>
              <Route element={<Login />} path="/login"/>
              <Route element={<SignUp />} path="/signup"/>
            </Route>

            {/* public routes */}
            <Route element={<HomePage />} path="/"/>

          </Routes>
        </Router>
        <Toaster richColors />
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
)
