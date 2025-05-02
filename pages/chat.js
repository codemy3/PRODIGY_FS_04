import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Call the backend API to trigger the Socket.io server initialization
    const connectSocket = async () => {
      await fetch('/api/socket');

      // Initialize the socket connection after the server-side socket handler is triggered
      socket = io({
        path: '/api/socket', // Ensure this matches the backend socket path
      });

      // Listen for the 'receiveMessage' event and update the message list
      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    };

    connectSocket();

    return () => {
      if (socket) socket.disconnect(); // Clean up socket connection on unmount
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Emit 'sendMessage' event to the server with the message data
    socket.emit('sendMessage', { username: 'user', text: input });

    // Optimistically add the message to the UI
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="h-screen bg-[#343541] text-white flex flex-col">
      <header className="text-center p-4 text-lg font-semibold border-b border-gray-600">
        Message App
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-green-600' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-600 bg-[#343541] flex">
        <input
          type="text"
          className="flex-1 p-3 rounded-md bg-[#40414F] text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
