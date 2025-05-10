import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hi! I\'m your CareConnect assistant. How can I help you today? I can help you with:\n• Finding suitable healthcare professionals\n• Emergency medical advice\n• Booking appointments\n• Understanding our services' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setInput('');

    try {
      // Send message to API
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful healthcare assistant for CareConnect, a platform that connects patients with healthcare professionals. You help users find appropriate care, provide basic medical information, and assist with booking appointments. Always remind users to seek professional medical help for serious conditions."
          },
          {
            role: "user",
            content: input
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Add API response to chat
      if (response.data.choices && response.data.choices[0]) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: response.data.choices[0].message.content
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'I apologize, but I encountered an error. Please try again or contact our support team.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="chat-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>CareConnect Assistant</h3>
        <FontAwesomeIcon 
          icon={faTimes} 
          onClick={() => setIsOpen(false)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.type === 'user' ? 'sent' : 'received'}`}
          >
            {message.text}
          </div>
        ))}

        {isTyping && (
          <div className="message received">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button 
          type="submit" 
          disabled={!input.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;