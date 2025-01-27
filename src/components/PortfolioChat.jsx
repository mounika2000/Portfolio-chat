import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const TypeWriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Adjust speed here (lower number = faster)
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div>
      {displayText.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};


const PortfolioChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi, I'm Mounika's Chatbot Agent! Welcome to the portfolio website. I'm here to guide you through Mounika's projects, skills, and accomplishments. Feel free to ask me about her work, expertise, or anything else you'd like to explore. Let's get started!",
      isTyping: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined responses for quick links
  const quickResponses = {
    "Why should I hire Mounika?": 
      "Mounika brings a unique combination of technical expertise and creative problem-solving skills. With extensive experience in web development, she has successfully delivered multiple projects that demonstrate her ability to create efficient, scalable solutions. Her strong communication skills and commitment to continuous learning make her an invaluable team member.",
    
    "Tell me about Mounika's work experience":
      "Mounika has worked with various technologies and frameworks across different roles. Her experience includes full-stack development, UI/UX design, and project management. She has contributed to both startup environments and established companies, showing adaptability and leadership in different contexts.",
    
    "Show me Mounika's projects":
      "Here are some of Mounika's notable projects:\n\n1. Portfolio Chat Interface - An interactive portfolio website using React and AI\n2. E-commerce Platform - Full-stack application with React and Node.js\n3. Data Visualization Dashboard - Interactive analytics platform\n4. Mobile-First Web Applications - Multiple responsive web solutions",
    
    "What are Mounika's skills?":
      "Mounika's technical skills include:\n\n• Frontend: React, JavaScript, HTML5, CSS3, Tailwind\n• Backend: Node.js, Express, Python\n• Database: MongoDB, PostgreSQL\n• Tools: Git, Docker, AWS\n• Soft Skills: Project Management, Team Leadership, Communication"
  };

  const quickLinks = [
    { id: 1, text: "Why should I hire Mounika?", icon: "👤" },
    { id: 2, text: "Tell me about Mounika's work experience", icon: "💼" },
    { id: 3, text: "Show me Mounika's projects", icon: "💻" },
    { id: 4, text: "What are Mounika's skills?", icon: "🎯" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickLink = (text) => {
    handleSend(text);
  };

  const handleSend = async (text) => {
    const messageToSend = text || inputMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', content: messageToSend }];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // If it's a quick link, use predefined response
    if (quickResponses[messageToSend]) {
      const response = quickResponses[messageToSend];
      setMessages([...newMessages, { 
        type: 'bot', 
        content: response,
        isTyping: true 
      }]);
      return;
    }

    // Otherwise, send to ChatGPT
    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        body: JSON.stringify({ message: messageToSend }),
      });
      
      const data = await response.json();
      setMessages([...newMessages, { 
        type: 'bot', 
        content: data.message,
        isTyping: true 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { 
        type: 'bot', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        isTyping: true 
      }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">
        How can I assist you in exploring Mounika's portfolio today?
      </h1>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100'
            }`}>
              {message.type === 'bot' && message.isTyping ? (
                <TypeWriter 
                  text={message.content} 
                  onComplete={() => {
                    const updatedMessages = [...messages];
                    updatedMessages[index].isTyping = false;
                    setMessages(updatedMessages);
                    setIsTyping(false);
                  }}
                />
              ) : (
                message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleQuickLink(link.text)}
              disabled={isTyping}
              className={`px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors ${
                isTyping ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {link.icon} {link.text}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            placeholder="Type here"
            disabled={isTyping}
            className={`flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping}
            className={`p-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChat;