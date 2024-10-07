import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import './index.css'

import {MantineProvider} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { Root } from './pages/Root';
import { AllReservations } from './pages/AllReservations';

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
          {
            path: '/',
            element: <AllReservations />
          },
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