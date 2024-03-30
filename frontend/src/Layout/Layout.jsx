import React from "react";
import Navbar from "../user/components/Navigation/Navbar";
import Footer from "../user/components/Footer/Footer";
import {  Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";



export default function Layout() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
}
