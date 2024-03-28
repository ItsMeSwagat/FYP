import React, { useEffect } from "react";
import Navbar from "../user/components/Navigation/Navbar";
import Footer from "../user/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import store from "../store";
import { loadUser } from "../actions/userAction";

export default function Layout() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
