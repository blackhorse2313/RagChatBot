import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";

const ManageAbout = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const fetchAboutMe = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/aboutme/`
      );
      setTitle(response.data?.title);
      setContent(response.data?.content);
    } catch (error) {
      console.error("Error fetching aboutme", error);
    }
  };

  const handleSubmit = async () => {
    if (title === "" || content === "") {
      api.warning({
        message: "Please fill out all inputs in the form.",
      });
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/aboutme/`, {
        title: title,
        content: content,
      });
      api.success({
        message: "Successfully updated aboutme.",
      });
    } catch (error) {
      api.error({
        message: "Error fetching aboutme",
      });
    }
  };

  return (
    <main className="flex flex-col h-full py-10 px-5 md:px-0">
      {contextHolder}
      <section className="text-center md:w-2/3 md:mx-auto w-full px-2 flex flex-col justify-end h-full">
        <button
          className="bg-indigo-700 text-white px-5 py-2 rounded-md mb-4 ml-auto"
          onClick={handleSubmit}
        >
          Save
        </button>
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
      </section>
    </main>
  );
};

export default ManageAbout;
