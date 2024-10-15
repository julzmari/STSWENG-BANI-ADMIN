import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom"; //added navigate for route navigation

import './index.css'

import {MantineProvider} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { Root } from './pages/Root';
import { AllReservations } from './pages/AllReservations';
import { PastReservations } from './pages/PastReservations';
import { Rooms } from './pages/Rooms';


//login is export def so no { } 
import Login from './pages/Login';

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // Checks if authenticated
  };

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };
//

const router = createBrowserRouter([
    {
      element: <Root />,
      children: [
        {
          path: '/',
          element: <ProtectedRoute><AllReservations /></ProtectedRoute> // wraps dashboard route, this should be used on all routes 
        },
        {
          path: '/login',
          element: <Login /> // public
        },
        {
          path: '/pastreservations',
          element: <ProtectedRoute><PastReservations /></ProtectedRoute> 
        }
        ,
        {
          path: '/rooms',
          element: <ProtectedRoute><Rooms /></ProtectedRoute> 
        }
      ]
    },
  ]);

const queryClient:QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 15
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                    <RouterProvider router={router} />
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);