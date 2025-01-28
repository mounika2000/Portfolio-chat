import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaFile,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ProfileIntro = () => {
  return (
    <div className="h-screen w-3/5 flex flex-col justify-center items-start pl-10 bg-white">
      <div className="flex items-center space-x-4 sm:space-x-2 overflow-visible">
        <img
          src="profile.png"
          alt="Profile"
          className="w-48 h-48 rounded-full border-4 border-gray-300 shadow-lg"
        />
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
          I'm a{" "}
          <span className="bg-gray-200 px-2 rounded-md font-bold">
            Full stack software developer
          </span>
        </h1>
      </div>
      <p className="mt-4 text-2xl text-gray-800 font-light">
        who builds immersive and user-friendly{" "}
        <span className="font-bold">applications.</span>
      </p>

      <p className="mt-6 text-gray-500 text-lg">
      Currently, I’m building impactful web solutions at <span className="font-bold">Tesla</span>, turning complex ideas into elegant digital experiences. Whether it's pixel-perfect UIs or performance-optimized apps, I love bringing designs to life with clean, efficient code.{" "}
       
      </p>
      <p className="mt-6 text-gray-500 text-lg">
    I’m an avid reader and a creative at heart .{" "}
      </p>


      <div className="mt-8 grid grid-cols-3 gap-8">
        <div>
          <h1 className="font-semibold text-gray-900">Previously worked at </h1>
          <div className="grid grid-cols-2 gap-x-1 gap-y-4  mt-4">
  <img src="/tesla.png" alt="Tesla" className="w-16 h-16" />
  <img src="/adobe.png" alt="Adobe" className="w-16 h-16" />
  <img src="/dell.png" alt="Dell" className="w-16 h-16" />
  <img src="/rsa.png" alt="RSA" className="w-16 h-16" />
</div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Tech Stack</h3>
          <p className="text-gray-700">ReactJS, Javascript, TypeScript, Angular, C++ Java, PHP, Python, C, MySQL, PostgreSQL, MongoDB, Git, AWS</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Projects</h3>
          <p className="text-blue-500 underline flex items-center">
            <a
              href="https://devpost.com/software/pawsome-nk68yv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline inline-flex items-center"
            >
              Pawsome <FaExternalLinkAlt className="ml-2" />
            </a>
          </p>
          <p className="text-blue-500 underline flex items-center">
          <a
              href="https://github.com/sumukh-aradhya/DSP_Final"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline inline-flex items-center"
            >
              Recommendation Engine <FaExternalLinkAlt className="ml-2" />
            </a>
          </p>
          <p className="text-blue-500 underline flex items-center">
          <a
              href="https://github.com/mounika2000/Local_MarketPlace-React-JS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline inline-flex items-center"
            >
              Local Marketplace <FaExternalLinkAlt className="ml-2" />
            </a>
          </p>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-md">
      I’m always on the lookout for the <span className="bg-yellow-200 px-1">promising opportunity</span> to collaborate and push boundaries. Let’s create something amazing together!
      </p>
      <div className="mt-8 flex flex-row space-x-4">
        <a
          href="https://drive.google.com/file/d/14tSTJyKPUNkS6ubXCa95g1NfBpA4w7oo/view?usp=sharing"
          download
          className="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors flex items-center"
        >
          <FaFile className="mr-2" /> Download Resume
        </a>
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com/in/peteti-sai-mounika"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3  border-gray-400 rounded-full hover:bg-gray-200 transition-all"
          >
            <FaLinkedin className="text-gray-500" size={32} />
          </a>

          <a
            href="https://github.com/mounika2000"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3  border-gray-400 rounded-full hover:bg-gray-200 transition-all"
          >
            <FaGithub className="text-gray-500" size={32} />
          </a>
          <a
            href="mailto:petetimounika00@gmail.com"
            className="p-3  border-gray-400 rounded-full hover:bg-gray-200 transition-all"
          >
            <FaEnvelope className="text-gray-500" size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntro;
