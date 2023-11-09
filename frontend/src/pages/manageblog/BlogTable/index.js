import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CreateBlogModal from "./Modal/CreateBlogModal";
import DeleteBlogModal from "./Modal/DeleteBlogModal";

import { notification } from "antd";

const BlogTable = () => {
  const [data, setData] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blogs/`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const openModal = (blog = null) => {
    setIsEdit(!!blog);
    setCurrentBlog(blog);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBlog(null);
  };

  const openDeleteModal = (blog) => {
    setCurrentBlog(blog);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCurrentBlog(null);
    setDeleteModalOpen(false);
  };

  const handleCreateEdit = async (blog) => {
    if (blog.title === "" || blog.content === "" || blog.url === "") {
      api.warning({
        message: "Please fill out all inputs in the form.",
      });
      return;
    }
    try {
      if (isEdit) {
        await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/blogs/${currentBlog.id}`,
          blog
        );
      } else {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs`, blog);
      }
      fetchBlogs();
      closeModal();
      api.success({
        message: "Successfully creating/updated blog.",
      });
    } catch (error) {
      api.error({
        message: "Error creating/updating blog.",
      });
      console.error("Error creating/updating blog", error);
    }
  };

  const handleDelete = async (isDelete) => {
    if (!isDelete) {
      closeDeleteModal();
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/blogs/${currentBlog.id}`
      );
      fetchBlogs();
      closeDeleteModal();
      api.success({
        message: "Successfully deleted blog.",
      });
    } catch (error) {
      api.error({
        message: "Error deleting blog.",
      });
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="w-full">
      {contextHolder}
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-10"
        onClick={() => openModal()}
      >
        Create Blog
      </button>
      <div className="bg-white shadow-md rounded my-2">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-indigo-600 text-white text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left w-36">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.length === 0 ? (
              <tr>
                <td className="py-3 px-6 text-left" colSpan={2}>
                  No data
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center whitespace-break-spaces">
                      <div className="font-medium">{item.title}</div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center whitespace-break-spaces">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => openModal(item)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openDeleteModal(item)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CreateBlogModal
        isOpen={modalOpen}
        onSubmit={handleCreateEdit}
        onClose={closeModal}
        blog={currentBlog}
      />
      <DeleteBlogModal isOpen={deleteModalOpen} onClose={handleDelete} />
    </div>
  );
};

export default BlogTable;
