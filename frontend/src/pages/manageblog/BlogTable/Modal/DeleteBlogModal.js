import React from "react";

const DeleteBlogModal = ({ isOpen, onClose }) => {
  const handleDelete = (isDelete) => () => {
    onClose(isDelete);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-900/30 p-5">
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-indigo-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
          <h3 className="text-lg leading-6 font-medium text-white">
            Confirm Delete
          </h3>
        </div>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-b-lg">
          <p>Are you sure you want to delete this blog?</p>
          <div className="flex justify-end">
            <button
              className="bg-white text-gray-500 border border-gray-500 p-2 mt-7 ml-auto rounded-lg w-18"
              onClick={handleDelete(false)}
            >
              Close
            </button>
            <button
              className="bg-red-500 text-white p-2 mt-7 ml-2 rounded-lg w-18"
              onClick={handleDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
