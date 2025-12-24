'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // В реальном приложении здесь была бы отправка сообщения
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl mb-4 overflow-hidden animate-fade-in origin-bottom-right flex flex-col">
          <div className="bg-neutral-800 p-4 border-b border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-white">Nexus Support</h3>
              <p className="text-[10px] text-neutral-400">We typically reply in a few minutes</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg rounded-tl-none text-xs text-neutral-300">
                Hello! How can we help you today?
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-neutral-900 border-t border-neutral-800">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
                className="w-full bg-black border border-neutral-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white rounded-full shadow-lg shadow-white/10 flex items-center justify-center text-black hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}