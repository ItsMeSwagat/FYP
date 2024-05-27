import React from "react";
import Navbar from "../user/components/Navigation/Navbar";
import Footer from "../user/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import MessengerChat from "../user/components/Messenger/MessengerChat";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <MessengerChat /> */}
      <Footer />
    </>
  );
}
