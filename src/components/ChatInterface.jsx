import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample user data - In reality, this would come from your auth system
  const currentUser = {
    id: '123',
    name: 'Guest User',
    role: 'guest'
  };

  const sampleMessages = [
    {
      id: 1,
      sender: { id: '456', name: 'Hotel Staff', role: 'staff' },
      content: 'Hello! How can I assist you today?',
      timestamp: new Date(Date.now() - 100000).toISOString()
    },
    {
      id: 2,
      sender: { id: '123', name: 'Guest User', role: 'guest' },
      content: 'Hi, I have a question about my booking.',
      timestamp: new Date(Date.now() - 50000).toISOString()
    }
  ];

  useEffect(() => {
    // Load initial messages
    setMessages(sampleMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);

    // Create new message object
    const messageData = {
      id: Date.now(),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // Add message to UI immediately
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    try {
      // Here you would integrate with your backend API
      // await sendMessage(messageData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-blue-600 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">Hotel Support Chat</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender.id === currentUser.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="text-sm font-semibold mb-1">
                {message.sender.name}
              </div>
              <p className="text-sm">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender.id === currentUser.id
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading || !newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;