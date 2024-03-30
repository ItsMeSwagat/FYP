import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
