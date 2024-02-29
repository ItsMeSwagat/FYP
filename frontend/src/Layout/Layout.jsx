import React from "react";
import Navbar from "../user/components/Navigation/Navbar";
import Footer from "../user/components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
}
