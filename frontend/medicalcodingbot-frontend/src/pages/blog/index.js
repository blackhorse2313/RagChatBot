import React from "react";
import Blog from "./blog";

import "./blog.css";
import BlogContents from "../../utils/blogcontent";

const BlogList = () => {
  const blogs = BlogContents;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-5" id="qa_box">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
