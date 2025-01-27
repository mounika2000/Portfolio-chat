import React, { useState } from 'react';
import PortfolioChat from './components/PortfolioChat';
import ProfileSidebar from './components/ProfileSidebar';



const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => setIsChatOpen(true)}
      >
        💬 Chat with me
      </button>
      {isChatOpen && <PortfolioChat onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;
