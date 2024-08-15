import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { useColorModes } from '@coreui/react'
import './scss/style.scss'
import DefaultDashboardLayout from "./components/default_dashboard_layout/DefaultDashboardLayout"
import Dashboard from "./views/dashboard/Dashboard"
import Users from "./views/pages/users/Users"
import UserDetails from "./views/pages/user_details/UserDetails"
import Avatars from "./views/pages/avatars/Avatars"
import AvatarDetails from "./views/pages/avatar_details/AvatarDetails"
import Experiences from "./views/pages/experiences/Experiences"
import ExperienceDetails from "./views/pages/experience_details/ExperienceDetails"
import Requests from "./views/pages/requests/Requests"
import Profile from "./views/pages/profile/Profile"
import Login from "./views/pages/login/Login"
import ForgotPassword from "./views/pages/forgot_password/ForgotPassword"
import Page404 from "./views/pages/page404/Page404"

const App = ({ children }) => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultDashboardLayout />,
      errorElement: <Page404 />,
      children: [
        {
          path: "/",
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/users",
          element: <Users />
        },
        {
          path: "/admin/users/:userId",
          element: <UserDetails />
        },
        {
          path: "/admin/avatars",
          element: <Avatars />
        },
        {
          path: "/admin/avatars/:avatarId",
          element: <AvatarDetails />
        },
        {
          path: "/admin/experiences",
          element: <Experiences />
        },
        {
          path: "/admin/experiences/:experienceId",
          element: <ExperienceDetails />
        },
        {
          path: "/admin/requests",
          element: <Requests />
        },
        {
          path: "/admin/profile",
          element: <Profile />
        },
      ]
    },
    {
      path: "/admin/login",
      element: <Login />
    },
    {
      path: "/admin/forgot-password",
      element: <ForgotPassword />
    },
  ])

  return (
    <RouterProvider router={router}>{children}</RouterProvider>
  )
}

export default App
