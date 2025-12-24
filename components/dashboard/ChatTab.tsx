'use client';

import { useState } from 'react';
import { Search, MoreHorizontal, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'other';
  name: string;
  avatar: string;
  text: string;
  time: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
}

export default function ChatTab() {
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      lastMessage: 'Can you check the PR?',
      time: '10:42',
      online: true,
    },
    {
      id: '2',
      name: 'Mike Ross',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      lastMessage: 'Designs are uploaded.',
      time: 'Yesterday',
      online: false,
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'other',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      text: "Hey! I just pushed the latest changes to the staging environment. Could you take a look when you have a moment?",
      time: '10:30 AM',
    },
    {
      id: '2',
      sender: 'user',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'Sure thing. Checking it now.',
      time: '10:35 AM',
    },
    {
      id: '3',
      sender: 'user',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'Looks clean! One small thing - the border radius on the input fields seems off on mobile.',
      time: '10:35 AM',
    },
    {
      id: '4',
      sender: 'other',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      text: "Ah, good catch. I'll fix that right away. Can you check the PR?",
      time: '10:42 AM',
    },
  ]);

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // В реальном приложении здесь была бы отправка сообщения
    setMessageInput('');
  };

  return (
    <div className="h-screen flex">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-neutral-800">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-10 bg-black border border-neutral-800 rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                activeContact.id === contact.id ? 'bg-neutral-800' : 'hover:bg-neutral-900'
              }`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full object-cover" />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-neutral-800 rounded-full ${
                    contact.online ? 'bg-green-500' : 'bg-neutral-500'
                  }`}
                ></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-white">{contact.name}</span>
                  <span className="text-[10px] text-neutral-500">{contact.time}</span>
                </div>
                <p className="text-xs text-neutral-400 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Chat Header */}
        <div className="h-14 border-b border-neutral-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="font-medium text-white">{activeContact.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              activeContact.online
                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                : 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
            }`}>
              {activeContact.online ? 'Online' : 'Offline'}
            </span>
          </div>
          <button className="text-neutral-500 hover:text-white">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <img src={message.avatar} alt={message.name} className="w-8 h-8 rounded-full object-cover mt-1" />
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`flex items-baseline gap-2 mb-1 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium text-white">{message.name}</span>
                  <span className="text-[10px] text-neutral-500">{message.time}</span>
                </div>
                <div
                  className={`text-sm leading-relaxed p-3 border ${
                    message.sender === 'user'
                      ? 'bg-neutral-800 border-neutral-700 text-white rounded-l-lg rounded-br-lg'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 rounded-r-lg rounded-bl-lg'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-800">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}