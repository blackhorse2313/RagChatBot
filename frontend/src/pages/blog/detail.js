import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blogs/${id}`
      );
      console.log(response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to={`/blog`}>
        <button className="mb-4 bg-indigo-700 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
      <div className="lg:text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {blog?.title}
        </p>
      </div>
      <div className="mt-10">
        <div className="mt-6 prose prose-indigo prose-lg max-w-none text-gray-500">
          <div
            dangerouslySetInnerHTML={{
              __html: blog?.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
