import Dashboard from "../views/dashboard/Dashboard";
import Users from "../views/pages/users/Users";
import UserDetails from "../views/pages/user_details/UserDetails";
import Avatars from "../views/pages/avatars/Avatars";
import AvatarDetails from "../views/pages/avatar_details/AvatarDetails";
import Experiences from "../views/pages/experiences/Experiences";
import ExperienceDetails from "../views/pages/experience_details/ExperienceDetails";
import Requests from "../views/pages/requests/Requests";
import Profile from "../views/pages/profile/Profile";
import Login from "../views/pages/login/Login";
import ForgotPassword from "../views/pages/forgot_password/ForgotPassword";
import Page404 from "../views/pages/page404/Page404";
import RootFunction from "./RootFunction";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorageUtils";
import DefaultDashboardLayout from "../components/DefaultModel/DefaultDashboardLayout";

const LoginProtected = ({ children }) => {
  const admin = getLocalStorage("token");

  return admin ? <Navigate to="/admin/dashboard" replace /> : children;
};

const DashboardProtected = ({ children }) => {
  const admin = getLocalStorage("token");

  return admin ? <DefaultDashboardLayout>{children}</DefaultDashboardLayout> : <Navigate to="/admin/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootFunction />,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "/admin/dashboard",
        element: <DashboardProtected><Dashboard /></DashboardProtected>,
      },
      {
        path: "/admin/users",
        element: <DashboardProtected><Users /></DashboardProtected>,
      },
      {
        path: "/admin/users/:userId",
        element: <DashboardProtected><UserDetails /></DashboardProtected>,
      },
      {
        path: "/admin/avatars",
        element: <DashboardProtected><Avatars /></DashboardProtected>,
      },
      {
        path: "/admin/avatars/:avatarId",
        element: <DashboardProtected><AvatarDetails /></DashboardProtected>,
      },
      {
        path: "/admin/experiences",
        element: <DashboardProtected><Experiences /></DashboardProtected>,
      },
      {
        path: "/admin/experiences/:experienceId",
        element: <DashboardProtected><ExperienceDetails /></DashboardProtected>,
      },
      {
        path: "/admin/requests",
        element: <DashboardProtected><Requests /></DashboardProtected>,
      },
      {
        path: "/admin/profile",
        element: <DashboardProtected><Profile /></DashboardProtected>,
      },
    ]
  },
  {
    path: "/admin/login",
    element: <LoginProtected><Login /></LoginProtected>,
  },
  {
    path: "/admin/forgot-password",
    element: <LoginProtected><ForgotPassword /></LoginProtected>,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

