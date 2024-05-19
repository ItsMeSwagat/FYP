import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);

  if (user && user.role === "admin") {
    // If user is an admin, redirect to admin dashboard
    return <Navigate to="/admin/dashboard" />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
