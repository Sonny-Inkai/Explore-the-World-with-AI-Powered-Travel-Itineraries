import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/CreateTrip.jsx'
import Header from './components/custom/Header.jsx'
import Title from './components/custom/Title.jsx'
import ViewTrip from './view-trip/ViewTrip.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip',
    element:<ViewTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
