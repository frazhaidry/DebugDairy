import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Home/Landing.jsx";
import Feed from "../pages/Doc/Feed.jsx";
import CreateDoc from "../pages/Doc/CreateDoc.jsx";
import PostDetail from "../pages/Doc/PostDetail.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Future routes like /about, /contact, etc. */}
      <Route path="/docs" element={<Feed />} />
      <Route path="/docs/new" element={<CreateDoc />} />
      <Route path="/docs/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default AppRoutes;
