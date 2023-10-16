import React from "react";
import Blog from "./blog";

import "./blog.css";
import BlogContents from "../../utils/blogcontent";

const BlogList = () => {
  const blogs = BlogContents;

  return (
    <div className="flex flex-wrap justify-center p-5" id="qa_box">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
