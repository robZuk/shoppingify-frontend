import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Sidebar;
