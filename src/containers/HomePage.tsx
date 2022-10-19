import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../routes/routesConfig";
import "../styles/HomePage.css";

export default function HomePage(): JSX.Element {
   const navigate = useNavigate();
   const handleClick = useCallback(() => navigate(dashboard), [navigate]);

   return (
      <div className="homeContainer">
         <div onClick={handleClick} className="routeButton">Dashboard</div>
      </div>
   );
}