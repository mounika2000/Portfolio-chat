import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaFile,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ProfileSidebarMobile = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 pt-40 bg-white text-center">
      {/* Profile Image and Heading */}
      <div className="flex flex-col items-center space-y-6">
        <img
          src="profile.png"
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-300 shadow-lg"
        />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          I'm a{" "}
          <span className="bg-gray-200 px-2 rounded-md font-bold">
            Full stack software developer
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-xl text-gray-800 font-light">
        who builds immersive and user-friendly{" "}
        <span className="font-bold">applications.</span>
      </p>

      {/* About Section */}
      <p className="mt-6 text-gray-500 text-sm sm:text-md">
        Currently, I’m building impactful web solutions at{" "}
        <span className="font-bold">Tesla</span>, turning complex ideas into
        elegant digital experiences. Whether it's pixel-perfect UIs or
        performance-optimized apps, I love bringing designs to life with clean,
        efficient code.
      </p>
      <p className="mt-4 text-gray-500 text-sm sm:text-md">
        I’m an avid reader and a creative at heart.
      </p>

      {/* Logos Section */}
      <div className="mt-8">
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          Previously worked at
        </h3>
      <div className="mt-8 flex justify-center gap-6">
        <img src="/tesla.png" alt="Tesla" className="w-12 h-12 sm:w-16 sm:h-16" />
        <img src="/adobe.png" alt="Adobe" className="w-12 h-12 sm:w-16 sm:h-16" />
        <img src="/dell.png" alt="Dell" className="w-12 h-12 sm:w-16 sm:h-16" />
        <img src="/rsa.png" alt="RSA" className="w-12 h-12 sm:w-16 sm:h-16" />
      </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          Tech Stack
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm">
          ReactJS, JavaScript, TypeScript, Angular, C++, Java, PHP, Python, C,
          MySQL, PostgreSQL, MongoDB, Git, AWS
        </p>
      </div>

      {/* Projects */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          Projects
        </h3>
        <p className="text-blue-500 underline flex items-center justify-center sm:text-base">
          <a
            href="https://devpost.com/software/pawsome-nk68yv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            Pawsome <FaExternalLinkAlt className="ml-2" />
          </a>
        </p>
        <p className="text-blue-500 underline flex items-center justify-center sm:text-base">
          <a
            href="https://github.com/sumukh-aradhya/DSP_Final"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            Recommendation Engine <FaExternalLinkAlt className="ml-2" />
          </a>
        </p>
        <p className="text-blue-500 underline flex items-center justify-center sm:text-base">
          <a
            href="https://github.com/mounika2000/Local_MarketPlace-React-JS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            Local Marketplace <FaExternalLinkAlt className="ml-2" />
          </a>
        </p>
      </div>

      {/* Closing Statement */}
      <p className="mt-6 text-gray-500 text-xs sm:text-md">
        I’m always on the lookout for the{" "}
        <span className="bg-yellow-200 px-1">promising opportunity</span> to
        collaborate and push boundaries. Let’s create something amazing
        together!
      </p>

      {/* Links Section */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <a
          href="https://drive.google.com/file/d/14tSTJyKPUNkS6ubXCa95g1NfBpA4w7oo/view?usp=sharing"
          download
          className="px-3 py-2 text-xs sm:text-sm rounded-full border border-gray-300 hover:border-gray-400 transition-colors flex items-center"
        >
          <FaFile className="mr-2" /> Download Resume
        </a>
        
      </div>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        
        <a
          href="https://linkedin.com/in/peteti-sai-mounika"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border-gray-400 rounded-full hover:bg-gray-200 transition-all"
        >
          <FaLinkedin className="text-gray-500 sm:text-2xl text-xl" />
        </a>
        <a
          href="https://github.com/mounika2000"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border-gray-400 rounded-full hover:bg-gray-200 transition-all"
        >
          <FaGithub className="text-gray-500 sm:text-2xl text-xl" />
        </a>
        <a
          href="mailto:petetimounika00@gmail.com"
          className="p-3 border-gray-400 rounded-full hover:bg-gray-200 transition-all"
        >
          <FaEnvelope className="text-gray-500 sm:text-2xl text-xl" />
        </a>
      </div>
    </div>
  );
};

export default ProfileSidebarMobile;
