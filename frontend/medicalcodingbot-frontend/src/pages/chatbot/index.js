import React, { useEffect, useRef, useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const endOfChat = useRef(null);

  const scrollToBottom = () => {
    endOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const botReply = (message) => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You said "${message}"`, sender: "bot" },
      ]);
    }, 1000);
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

  return (
    <div className="flex justify-center items-center h-full p-5">
      <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-white p-3 rounded-lg border h-full">
        <div id={"qa_box"} className="overflow-auto px-2 py-3">
          {messages.map((msg, index) =>
            msg.sender === "user" ? (
              <div key={index} className="my-4 text-right">
                <div className="inline-block max-w-xs px-6 py-3 rounded-l-xl rounded-tr-xl bg-indigo-600 text-white">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={index} className="my-4 text-left">
                <div className="inline-block max-w-xs px-6 py-3 rounded-r-xl rounded-tl-xl bg-gray-200 text-black">
                  {msg.text}
                </div>
              </div>
            )
          )}
          <div ref={endOfChat}></div>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-1 mt-auto">
          <div>
            <div className="my-2 text-left">
              <div className="inline-block max-w-xs px-3 py-1 rounded-lg bg-gray-200 text-black">
                What is the code for total knee replacement?
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              name="message"
              className="flex-1 mr-4 rounded-lg border border-gray-500 py-2 px-4 outline-none focus:border-gray-700"
              placeholder="Type your message..."
              required
            />
            <button
              type="submit"
              className="bg-indigo-700 text-white rounded-lg px-6 py-2 hover:bg-indigo-900 focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
