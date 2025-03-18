import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am Ration Sathi 🤖. How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const chatBodyRef = useRef(null);

  // Scroll to the latest message automatically
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Generate bot response
  const generateBotReply = (message) => {
    const responses = {
      hello: "Welcome to the SRVAN PDS Portal! How can I help you today? 😊",
      "how are you": "I'm here to assist! Let me know your queries. 🚀",
      services: "I can help with Ration Card details, E-Ration downloads, Slot Booking, and Grievances.",
      "ration card": "You can check your Ration Card details in the 'Ration Card Search' section.",
      "e-ration": "Download your e-Ration Card from the 'E-Ration Download' section.",
      "slot booking": "Book your monthly ration pickup slot for hassle-free collection.",
      grievances: "For complaints, visit the 'Grievances' section. We’re here to assist!",
      products: "Check available ration items in the 'Ration Mart'.",
      "thank you": "You're welcome! Always here to help. 😊",
      bye: "Goodbye! Have a great day! 👋",
    };

    const replyKey = Object.keys(responses).find((key) =>
      message.toLowerCase().includes(key)
    );

    return {
      text: replyKey ? responses[replyKey] : "I'm not sure how to respond to that 🤔, but I'm learning!",
      sender: "bot",
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = generateBotReply(input);
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {!showChat ? (
        <button className="chat-toggle" onClick={() => setShowChat(true)}>
          <RiRobot2Line size={34} />
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <span>Ration Sathi 🤖</span>
            <button onClick={() => setShowChat(false)}>✖</button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
