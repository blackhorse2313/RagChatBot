import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/detail";
import Chatbot from "../pages/chatbot";
import Home from "../pages/home";
import FirstQuery from "../pages/firstquery";
import About from "../pages/about";
import ManageBlog from "../pages/manageblog";
import ManageAbout from "../pages/manageabout";
import NotFound from "../pages/notfound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:url" element={<BlogDetail />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/about" element={<About />} />
      <Route path="/firstquery10180" element={<FirstQuery />} />
      <Route path="/manageblog10180" element={<ManageBlog />} />
      <Route path="/manageabout10180" element={<ManageAbout />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
