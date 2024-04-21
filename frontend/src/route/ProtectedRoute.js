import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const verifyCookies = () => {
  const cookies = document.cookie;
  return cookies.includes("usertoken=");
};

export const ProtectedRoute = ({ isAdmin }) => {
  const { user } = useSelector((state) => state.user);

  const hasToken = verifyCookies();

  const allowAccess = hasToken;

  // if (isAdmin === false && user && user.role === "admin") {
  //   <Navigate to={`/admin/dashboard`} />;
  // }

  if (isAdmin === true && user && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return allowAccess ? <Outlet /> : <Navigate to={`/login`} />;
};
