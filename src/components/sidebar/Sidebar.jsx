import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <Suspense>{user?.name && <Outlet />}</Suspense>
    </div>
  );
}

export default Sidebar;
