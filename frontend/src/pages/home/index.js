import React from "react";
import Chatbot from "../chatbot";

const Home = () => {
  return (
    <main className="flex flex-col h-full md:py-10 py-4 px-2 md:px-0">
      <section className="text-center">
        <h1 className="text-xl md:text-4xl font-semibold text-indigo-800 md:mb-5 mb-3">
          I do one thing, and I do it well:
        </h1>
        <h2 className="text-lg md:text-2xl text-indigo-700 md:mb-5 mb-3">
          Find the right CPT® and ICD-10 codes.
        </h2>
        <h3 className="text-md md:text-2xl text-indigo-600 md:mb-5 mb-3">
          Let's find some codes!
        </h3>
      </section>
      <section className="flex-grow">
        <Chatbot className="h-full" />
      </section>
    </main>
  );
};

export default Home;
