import React, { useState, useEffect, useRef } from "react";
import { Send, MessageCircle } from "lucide-react";

const TypeWriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 5);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div>
      {displayText.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};

const MobileChat = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hi, I'm Mounika's Chatbot Agent! I know everything about her experiences, projects, and skills. Chat with me to explore her work, expertise, and accomplishments. Ask anything you'd like to know, and let's get started!",
      isTyping: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined responses for quick links
  const quickResponses = {
    "Why should I hire Mounika?":
      `Mounika is a highly skilled full-stack developer with a proven track record...`,
    "Mounika's work experience":
      `Mounika has extensive experience in full-stack development, having contributed to impactful projects...`,
    "Show me her projects":
      `Here are some of Mounika's full-stack projects that showcase her ability...`,
    "What are her skills?":
      `Mounika’s full-stack skill set includes...`,
  };

  const quickLinks = [
    { id: 2, text: "Mounika's work experience", icon: "💼" },
    { id: 3, text: "Show me her projects", icon: "💻" },
    { id: 4, text: "What are her skills?", icon: "🎯" },
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

    const newMessages = [...messages, { type: "user", content: messageToSend }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    if (quickResponses[messageToSend]) {
      const response = quickResponses[messageToSend];
      setMessages([
        ...newMessages,
        {
          type: "bot",
          content: response,
          isTyping: true,
        },
      ]);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      setMessages([
        ...newMessages,
        {
          type: "bot",
          content: data.message,
          isTyping: true,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          type: "bot",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later.",
          isTyping: true,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-4 bg-blue-500 rounded-full shadow-lg text-white hover:bg-blue-600 transition-all"
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="w-[95%] h-[70vh] bg-white shadow-lg border border-gray-300 rounded-lg flex flex-col p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-gray-900">Chat</h1>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] p-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white text-sm"
                      : "bg-gray-100 text-sm"
                  }`}
                >
                  {message.type === "bot" && message.isTyping ? (
                    <TypeWriter
                      text={message.content}
                      onComplete={() => setIsTyping(false)}
                    />
                  ) : (
                    message.content.split("\n").map((line, i) => (
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
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors text-xs"
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
                placeholder="Type here"
                disabled={isTyping}
                className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileChat;
