import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="py-6 px-8 border-b bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center font-semibold">
        <Link
          to="/"
          className="text-3xl text-indigo-700 tracking-tight font-bold"
        >
          <div className="flex">
            <img src="logo.png" width={"50px"} className="mr-2" />
            MedicalCodingBot
          </div>
        </Link>
        <div className="space-x-8">
          <Link
            to="/blog"
            className="hover:text-indigo-700 text-lg text-gray-800 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Blog
          </Link>
          <Link
            to="/chatbot"
            className="hover:text-indigo-700 text-lg text-gray-800 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Chatbot
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
