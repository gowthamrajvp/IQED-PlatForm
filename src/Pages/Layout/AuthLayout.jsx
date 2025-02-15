import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


const AuthLayout = () => {
  const location = useLocation();
  const UserData = useSelector((state) => state.UserState);
  const sessionid = Cookies.get("token");
  const { data: userdata, isError } = useGetUserQuery();
  const isQuizPath = location.pathname.startsWith("/quiz");

  console.log(UserData);

  if (isQuizPath || sessionid) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />
    // toast.error("Please check your network connection and log in again.");
    // return <Navigate to="/" state={{ from: location }} replace />;
  }
};


export default AuthLayout;
