import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="border-b py-6 px-4">
      <div className="container mx-auto flex justify-between items-center text-indigo-700 font-bold">
        <Link to="/" className="text-3xl">
          MedicalCodingBot
        </Link>
        <div className="space-x-4">
          <Link
            to="/blog"
            className="hover:text-gray-300 text-lg text-gray-900"
          >
            Blog
          </Link>
          <Link
            to="/chatbot"
            className="hover:text-gray-300 text-lg text-gray-900"
          >
            Chatbot
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
