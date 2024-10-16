import React from "react";
import { Navigate, useParams } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Utility
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

// Foundation (Master)
import EnvironmentList from "../pages/Masters/Environment/EnvironmentList";
import EnvironmentCreate from "../pages/Masters/Environment/EnvironmentCreate";

// Action Master
import ActionMasterList from "../pages/ActionMaster/ActionMasterList";
import ActionMasterCreate from "../pages/ActionMaster/ActionMasterCreate";
import ActionMasterView from "../pages/ActionMaster/ActionMasterView";

const authProtectedRoutes = [
  // >>>>>>>>>>  Dashboard  <<<<<<<<<<
  { path: "/dashboard", component: <Dashboard /> },

  //⭕>>>>>>>>>>  Masters  <<<<<<<<<<⭕

  // Environment
  { path: "/environment-list", component: <EnvironmentList /> },
  { path: "/environment-create", component: <EnvironmentCreate /> },
  { path: "/environment-create/:id", component: <EnvironmentCreate /> },

  // Dummy Master
  { path: "/action-master-list", component: <ActionMasterList /> },
  { path: "/action-master-create", component: <ActionMasterCreate /> },
  { path: "/action-master-create/:id", component: <ActionMasterCreate /> }, 
  { path: "/action-master-view/:id", component: <ActionMasterView /> }, 


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <AuthLockScreen /> },

  // Authentication Inner
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <ForgetPwd1 /> },

  { path: "/maintenance", component: <Maintenance /> },
  { path: "/comingsoon", component: <CommingSoon /> },
  { path: "/404", component: <Error404 /> },
  { path: "/500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };
