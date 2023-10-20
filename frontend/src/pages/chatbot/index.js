import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import BouncingDotsLoader from "../../components/BouncingDotsLoader";
import "./chatbot.css";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const endOfChat = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChat, setIsChat] = useState(false);

  const scrollToBottom = () => {
    endOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let deviceId = Cookies.get("device_id");
    if (!deviceId) {
      deviceId = uuidv4(); // Generate a new ID
      Cookies.set("device_id", deviceId, { expires: 365 }); // Store it in a cookie that expires in 1 year
    }
    console.log(deviceId); // Logs the device ID to the console
  }, []);

  useEffect(scrollToBottom, [messages]);

  const botReply = (question) => {
    setIsLoading(true);
    setIsChat(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/query/send`,
        { question: question },
        {
          headers: {
            "X-Device-Id": Cookies.get("device_id"),
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.answer, sender: "bot" },
        ]);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageContent = event.target.elements.message.value;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageContent, sender: "user" },
    ]);
    botReply(messageContent);
    event.target.reset();
  };

  const clickDefaultMessage = (event) => {
    event.preventDefault();
    const defaultMsg =
      "Try, what is the code for revision total knee replacement";
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: defaultMsg, sender: "user" },
    ]);
    botReply(defaultMsg);
  };

  return (
    <div className="flex justify-center items-center h-full p-5">
      <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-white p-3 rounded-lg border h-full">
        <div id={"qa_box"} className="px-2 py-3 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="my-4 ml-4 mr-4">
              {msg.sender === "user" ? (
                <div className="group flex items-end justify-end">
                  <div className="flex items-end">
                    <div className="max-w-lg bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lr-lg rounded-t">
                      {msg.text}
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <AiOutlineUser
                      className="text-indigo-600 group-hover:text-indigo-900 transition duration-200"
                      size={30}
                    />
                  </div>
                </div>
              ) : (
                <div className="group flex items-end justify-start">
                  <div className="text-left mr-2">
                    <AiOutlineRobot
                      className="text-gray-500 group-hover:text-gray-900 transition duration-200"
                      size={30}
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="max-w-lg bg-gray-200 text-black text-sm font-medium py-2 px-4 rounded-ll-lg rounded-t">
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="group flex items-end justify-start ml-4">
              <div className="text-left mr-2">
                <AiOutlineRobot
                  className="text-gray-500 group-hover:text-gray-900 transition duration-200"
                  size={30}
                />
              </div>
              <div className="flex items-end">
                <div className="max-w-lg bg-gray-200 text-black text-sm font-medium py-2 px-4 rounded-ll-lg rounded-t">
                  <BouncingDotsLoader />
                </div>
              </div>
            </div>
          )}
          <div ref={endOfChat}></div>
        </div>
        <div className="mt-auto">
          <form onSubmit={handleSubmit} className="px-4 pb-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                name="message"
                className="flex-grow mr-4 appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg border border-gray-500 focus:border-gray-700"
                placeholder="Type your message..."
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-800 text-white text-sm py-2 px-4 rounded-full"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
