import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import App from './App.jsx'

import Dashboard from './components/dashboard/dashboard/Dashboard.jsx'
import MemberCheck from './components/dashboard/Membercheck/MemberCheck.jsx'

const router = createBrowserRouter([
  {path: "/", element : <App/>},
  {path: "/socios", element : <MemberCheck/>},
  {path: "/dashboard", element : <Dashboard/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
