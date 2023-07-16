import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Infos from './components/Infos'
import Weather from './components/Weather'

import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Weather />,
    },
    {
        path: '/:infos',
        element: <Infos />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
