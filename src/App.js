import React, { useState, useEffect } from "react";
import PortfolioChat from "./components/PortfolioChat";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileSidebarMobile from "./components/ProfileSidebarMobile";
import MobileChat from "./components/MobileChat";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile or desktop view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Listen for screen resize
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Profile Sidebar: Always included */}

      {/* Conditional Rendering for ProfileIntro */}
      <div className="flex-1">
        {isMobile ? (
          <ProfileSidebarMobile />
        ) : (
          <ProfileSidebar />
        )}
      </div>

      {/* Portfolio Chat: Always visible, but can be toggled */}
      {isMobile ? <MobileChat /> : <PortfolioChat />}
    </div>
  );
};

export default App;
