import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/detail";
import Chatbot from "../pages/chatbot";
import Home from "../pages/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
