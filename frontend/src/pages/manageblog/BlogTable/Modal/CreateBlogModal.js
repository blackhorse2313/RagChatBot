import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    ["image", "video"], // link and image, video
  ],
};

const CreateBlogModal = ({ isOpen, onSubmit, onClose, blog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const removeSpecialCharsAndReplaceSpace = (str) => {
    // Remove special characters and replace spaces with '-'
    return str.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-");
  };

  const fetchBlog = async (url) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blogs/${url}`
      );
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setUrl(blog.url);
      fetchBlog(blog.url);
    } else {
      removeContent();
    }
  }, [blog]);

  const get_subcontent = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, "")?.substring(0, 100) + "...";
  };

  const handleSubmit = () => {
    const sub_content = get_subcontent(content);
    onSubmit({ title, url, content, sub_content });
    removeContent();
  };

  const changedTitle = (title) => {
    setTitle(title);
    setUrl(removeSpecialCharsAndReplaceSpace(title));
  };

  const handleClose = () => {
    removeContent();
    onClose();
  };

  const removeContent = () => {
    setTitle("");
    setUrl("");
    setContent("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-900/30 p-2">
      <div className="bg-white rounded-lg shadow-md h-full md:h-3/4 w-full md:w-1/2 m-2 flex flex-col">
        <div className="bg-indigo-700 px-6 py-4 text-white rounded-t-lg flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium">Blog</h3>
          <button onClick={handleClose} className="text-white">
            X
          </button>
        </div>
        <div className="px-6 py-4 flex-grow overflow-auto">
          <div className="flex flex-col h-full">
            <input
              className="border mb-4 p-2 w-full rounded-lg"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => changedTitle(e.target.value)}
            />
            <input
              className="border mb-4 p-2 w-full rounded-lg"
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex-grow pb-16">
              <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                onChange={setContent}
                className="h-full text-gray-900"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="bg-white text-gray-500 border border-gray-300 hover:border-gray-500 p-2 mt-4 rounded-lg transition-colors duration-150 hover:text-black w-20"
              >
                Close
              </button>
              <button
                className="bg-indigo-700 text-white p-2 mt-4 rounded-lg transition-colors duration-150 hover:bg-indigo-800 ml-2 w-20"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;
