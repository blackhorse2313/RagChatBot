import React, { useEffect, useState } from "react";
import Blog from "./blog";

import "./blog.css";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blogs/`
      );
      setBlogs(response.data);
      blogs.forEach((blog) => {
        blog["url"] = blog.title.replace(" ", "-");
      });
      console.log(blogs);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  return (
    <div>
      <div
        className="grid md:grid-cols-3 sm:grid-cols-2 md:w-4/5 md:mx-auto w-full my-6"
        id="qa_box"
      >
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
