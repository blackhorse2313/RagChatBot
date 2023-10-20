import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [aboutme, setAboutMe] = useState();

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const fetchAboutMe = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/aboutme`
      );
      setAboutMe(response.data);
    } catch (error) {
      console.error("Error fetching aboutme", error);
    }
  };

  return (
    <main className="flex flex-col h-full py-10 px-5 md:px-0">
      <section className="text-center md:w-2/3 md:mx-auto w-full px-2">
        <h3 className="text-2xl md:text-3xl font-semibold text-indigo-800 mb-5">
          {aboutme?.title}
        </h3>
        <div
          className="text-left"
          dangerouslySetInnerHTML={{
            __html: aboutme?.content.replace(/\n/g, "<br />"),
          }}
        />
      </section>
    </main>
  );
};

export default About;
