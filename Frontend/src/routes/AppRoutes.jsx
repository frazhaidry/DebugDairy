import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Home/Landing.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Future routes like /about, /contact, etc. */}
    </Routes>
  );
};

export default AppRoutes;
