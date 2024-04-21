import React from "react";
import { SideNavbar } from "../admin/components/SideNavbar/SideNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className=" flex gap-5">
      <SideNavbar />
      <main className=" max-w-6xl h-screen flex-1 mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
