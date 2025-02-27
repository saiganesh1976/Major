import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";

import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! this is Ration Sathi, How can I help?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const [showChat, setShowChat] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return; // Remove extra space

    const userMessage = { text: input, sender: "user" };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botReply = generateBotReply(input);
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);

    setInput("");
  };

  const generateBotReply = (message) => {
    const responses = {
      hello: "Welcome to the SRVAN PDS Portal! How can I assist you today? 😊",
      "how are you": "I'm here to serve! Let me know how I can help with your ration needs.",
      services: "I can assist you with ration card details, e-ration downloads, slot booking, grievances, and more!",
      "ration card": "You can check your ration card details and status in the 'Ration Card Search' section of the portal.",
      "e-ration": "You can download your e-ration card from the 'E-Ration Download' section. Let me know if you need help!",
      "slot booking": "You can book your ration pickup slot through our 'Monthly Ration Distribution' feature for a hassle-free experience.",
      grievances: "If you have any issues, you can file a complaint in the 'Grievances' section, and we will assist you promptly!",
      products: "Check out the available ration products in the 'Ration Mart' section and ensure compliance with PDS guidelines.",
      "thank you": "You're welcome! Happy to help. 😊",
      bye: "Goodbye! Have a great day and stay safe! 👋",
    };
    
    

    const reply = Object.keys(responses).find((key) =>
      message.toLowerCase().includes(key)
    );
    return {
      text: reply ? responses[reply] : "I'm not sure how to respond to that 🤔",
      sender: "bot",
    };
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
            <span>Ration Sathi</span>
            <button onClick={() => setShowChat(false)}>✖</button>
          </div>
          <div className="chat-body">
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




