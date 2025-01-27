import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const TypeWriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 5); // Adjust speed here (lower number = faster)
      
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
      content: "Hi, I'm Mounika's Chatbot Agent! I know everything about her experiences, projects, and skills. Chat with me to explore her work, expertise, and accomplishments. Ask anything you'd like to know, and let's get started!",
      isTyping: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined responses for quick links
  const quickResponses = {
    "Why should I hire Mounika?": 
      `Mounika is a highly skilled full-stack developer with a proven track record of delivering end-to-end solutions that are scalable, efficient, and user-centric. 
      With experience at Tesla and Adobe, she has successfully developed and optimized web applications using modern technologies like React, TypeScript, Node.js, and AWS. 
      Her ability to seamlessly integrate frontend and backend components, coupled with a strong focus on performance optimization and cross-functional collaboration, 
      makes her an invaluable asset to any engineering team. Her proactive approach to problem-solving and commitment to continuous learning ensure that she consistently delivers high-quality results.`,
  
    "Tell me about Mounika's work experience": 
      `Mounika has extensive experience in full-stack development, having contributed to impactful projects at Tesla and Adobe. 
      At Tesla, she led the end-to-end development of critical web features, improving API response times by 23% and optimizing page load speeds through efficient frontend and backend integration. 
      At Adobe, she spearheaded the modernization of key UI components, enabling seamless transitions between legacy and modern interfaces while enhancing memory efficiency and deployment processes. 
      Her experience spans frontend frameworks like React and backend technologies such as Node.js and Flask, making her adept at handling complex, large-scale applications.`,
  
    "Show me Mounika's projects": 
      `Here are some of Mounika's full-stack projects that showcase her ability to develop scalable and responsive web applications:
  
      \n\n• PAWSOME: Interactive Pet Wellness Web App 
      Full-stack web application leveraging AI to provide personalized pet fitness plans with 92% accuracy.  
      Technologies: React (frontend), Flask (backend), TypeScript, Python, MongoDB.  
  
      \n\n• Advanced Recommendation Engine
      Built a recommendation system that delivers personalized suggestions using collaborative filtering and distributed computing for scalability.  
      Technologies: Python (backend), Scikit-learn, MySQL, Hadoop, Flask.  
  
      \n\n• Local Marketplace Platform
      Developed a responsive e-commerce web app for local businesses, increasing user engagement and community interactions.  
      Technologies: React (frontend), Node.js (backend), Firebase, HTML, CSS.`,
  
    "What are Mounika's skills?": 
      `Mounika’s full-stack skill set includes:
  
      \n\n• Languages: C++, JavaScript, TypeScript, Java, PHP, Python, C
      \n\n• Frameworks/ Tools: React, React Native, Flask, Webpack, NodeJS, Angular, Android Studio, Amazon Web Services (AWS), Git,
      Github, Docker, Jenkins, Django, Postman, Splunk, HTML, CSS
      \n\n• Databases: MySQL, PostgreSQL, MongoDB, DynamoDB, Neo4J, Firebase`
      
  };
  

  const quickLinks = [
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
    <div className="fixed bottom-8 right-8 w-1/3 h-3/4 bg-white shadow-lg border border-gray-300 rounded-lg flex flex-col p-4">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Chat to know my skills</h1>
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[80%] p-4 rounded-lg ${
            message.type === 'user' 
              ? 'bg-blue-500 text-white text-sm' 
              : 'bg-gray-100 text-sm'
          }`}>
            {message.type === 'bot' && message.isTyping ? (
              <TypeWriter text={message.content} onComplete={() => setIsTyping(false)} />
            ) : (
              message.content.split('\n').map((line, i) => <p key={i}>{line}</p>)
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
          className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
  );
};

export default PortfolioChat;