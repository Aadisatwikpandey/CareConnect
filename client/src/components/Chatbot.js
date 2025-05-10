import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your CareConnect assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection management
  useEffect(() => {
    if (isOpen && !ws.current) {
      connectToOllama();
    }
    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [isOpen]);

  const connectToOllama = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      ws.current = new WebSocket('ws://localhost:3001');
      
      ws.current.onopen = () => {
        setIsConnecting(false);
        console.log('Connected to Ollama');
      };

      ws.current.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          setIsTyping(false);
          setMessages(prev => [...prev, { type: 'bot', text: response.message }]);
        } catch (err) {
          console.error('Error parsing message:', err);
          setError('Failed to process the response');
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Failed to connect to the chat service');
        setIsConnecting(false);
      };

      ws.current.onclose = () => {
        console.log('Disconnected from Ollama');
        ws.current = null;
        setIsConnecting(false);
      };

    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to establish connection');
      setIsConnecting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      ws.current.send(JSON.stringify({ message: input }));
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
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
        <i className="fas fa-comments"></i>
      </button>
    );
  }

  return (
    <div className="chat-container" style={{ display: 'flex' }}>
      <div className="chat-header">
        <h3>CareConnect Assistant</h3>
        <i 
          className="fas fa-times" 
          onClick={() => setIsOpen(false)}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>

      <div className="chat-messages">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={connectToOllama}>Retry</button>
          </div>
        )}
        
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
          disabled={isConnecting}
        />
        <button 
          type="submit" 
          disabled={isConnecting || !input.trim()}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;