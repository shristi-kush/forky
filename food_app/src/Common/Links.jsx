import React from "react";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Profile from "../Pages/Profile/Profile";
import Details from "../Pages/Details/Details";
import LandingPage from "../Pages/Website/LandingPage";

export const Links = [
  {
    name: "Website",
    path: "/site",
    element: <LandingPage />,
    showInNavigation: true,
  },
  {
    name: "Home",
    path: "/",
    element: <Home />,
    showInNavigation: true,
  },
  {
    name: "login",
    path: "/login",
    element: <Login />,
    showInNavigation: true,
  },
  {
    name: "signup",
    path: "/signup",
    element: <Signup />,
    showInNavigation: true,
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Profile />,
    showInNavigation: true,
  },
  {
    name: "Details",
    path: "/details",
    element: <Details />,
    showInNavigation: true,
  },
];
