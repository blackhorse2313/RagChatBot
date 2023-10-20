import React, { useEffect, useState } from "react";

const CreateBlogModal = ({ isOpen, onSubmit, onClose, blog }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(blog);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = () => {
    onSubmit({ title, content });
    removeContent();
  };

  const handleClose = () => {
    removeContent();
    onClose();
  };

  const removeContent = () => {
    setTitle("");
    setContent("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-900/30 p-2">
      <div className="bg-white rounded-lg shadow-md h-2/3 w-full md:w-1/2 m-2 flex flex-col">
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
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border mb-4 p-2 w-full rounded-lg flex-grow"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
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
