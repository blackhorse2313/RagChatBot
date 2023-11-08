import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  function stripHtmlTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, "");
  }

  return (
    <div className="m-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        <h2 className="mt-2 mb-2 font-bold text-xl md:text-2xl">
          <Link
            to={`/blog/${blog.url}`}
            className="text-gray-700 hover:text-gray-600"
          >
            {blog.title}
          </Link>
        </h2>
        <p className="text-gray-700 flex-grow break-words">
          {stripHtmlTags(blog.content)?.substring(0, 100) + "..."}
        </p>
        <div className="mt-3">
          <Link
            to={`/blog/${blog.url}`}
            aria-label="read more"
            className="text-indigo-500 hover:text-indigo-600 font-semibold"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
