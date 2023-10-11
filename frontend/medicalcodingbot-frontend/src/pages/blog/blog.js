import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border overflow-hidden w-full md:w-108 md:max-w-none h-auto">
      <div className="md:flex flex-col h-full p-8">
        <div>
          <div className="uppercase tracking-wide text-md text-indigo-700 font-semibold">
            {blog.title}
          </div>
          <div className="flex-grow">
            <p className="mt-2 text-gray-500">
              {blog.content?.substring(0, 300) + "..."}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-2">
          <Link to={`/blog/${blog.id}`}>
            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
