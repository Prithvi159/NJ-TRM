import React from "react";
import { Outlet } from "react-router-dom";

export function PolledData() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
