import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute.jsx" // Adjust path as needed
import LandingPage from "../pages/Home/Landing.jsx";
import Feed from "../pages/Doc/Feed.jsx";
import CreateDoc from "../pages/Doc/CreateDoc.jsx";
import PostDetail from "../pages/Doc/PostDetail.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Features from "../pages/Features/Features.jsx";
import Community from "../pages/Community/Community.jsx";
import Contributors from "../pages/Contributors/Contributors.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/features" element={<Features />} />
      <Route path="/community" element={<Community />} />
      <Route path="/contributors" element={<Contributors />} />

      <Route path="/docs" element={<Feed />} />
      <Route 
        path="/docs/new" 
        element={
          <ProtectedRoute>
            <CreateDoc />
          </ProtectedRoute>
        } 
      />
      <Route path="/docs/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default AppRoutes;
