import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/GlobalLayout.css";

export default function GlobalLayout(): JSX.Element {
   return (
      <div className="globalContainer">
         <Outlet />
      </div>
   );
}