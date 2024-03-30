import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const verifyCookies = () => {
  const cookies = document.cookie;
  return cookies.includes("userToken="); 
};

const ProtectedRoute = ({ isAuthenticated }) => {

  const hasToken = verifyCookies();

  const allowAccess = isAuthenticated || hasToken;

  return allowAccess ? <Outlet /> : <Navigate to={`/login`} />;
};

export default ProtectedRoute;
