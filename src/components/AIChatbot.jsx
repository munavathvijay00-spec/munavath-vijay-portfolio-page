import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Sparkles, Command, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useSoundEffects } from '../context/SoundContext';

const AIChatbot = () => {
  const { projects } = usePortfolio();
  const { playClick, playHover } = useSoundEffects();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Vijay\'s AI assistant. Ask me anything about his projects, skills, or experience!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    playClick();
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic based on semantic keywords
    setTimeout(() => {
      let response = "";
      const lower = userMsg.toLowerCase();
      
      const defaultResponses = [
        "That's interesting! You can explore the Projects section to see how I tackle complex problems.",
        "I'm continuously learning! Feel free to reach out to Vijay via the Contact section for detailed discussions.",
        "Great question! My expertise spans across frontend development, UI/UX, and performance optimization.",
        "I'm an AI assistant designed to help you navigate this portfolio. Let me know if you want to see specific projects!"
      ];

      if (lower.includes('blockchain') || lower.includes('web3') || lower.includes('solidity')) {
        const web3Projects = projects.filter(p => p.techStack.includes('Solidity') || p.techStack.includes('Web3.js') || p.title.toLowerCase().includes('token'));
        if(web3Projects.length > 0) {
            response = `Vijay has extensive experience in Web3. You should definitely check out **${web3Projects[0].title}**!`;
        } else {
            response = "Vijay is a blockchain expert, specializing in smart contracts and tokenization engines.";
        }
      } else if (lower.includes('frontend') || lower.includes('react') || lower.includes('design')) {
        response = "Vijay crafts pixel-perfect, highly animated React interfaces. Just look at this portfolio!";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        response = "You can reach Vijay via the Contact section at the bottom, or connect with him on LinkedIn!";
      } else if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi') {
        response = "Hello there! How can I help you explore Vijay's portfolio today?";
      } else if (lower.includes('who are you')) {
        response = "I'm a virtual assistant built by Vijay to help guide you through this portfolio. Think of me as your personal tour guide!";
      } else {
        // Pick a random default response
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { playClick(); setIsOpen(true); }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full shadow-2xl shadow-emerald-500/50 flex items-center justify-center z-50 hover:bg-emerald-400 transition-colors"
      >
        <Sparkles size={24} className="text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-slate-800/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Bot size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Ask AI</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot size={12} className="text-emerald-400" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-sm' 
                      : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center mt-1">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot size={12} className="text-emerald-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-slate-800/30">
              <div className="relative flex items-center">
                <Command size={16} className="absolute left-3 text-gray-500" />
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my projects..."
                  className="w-full bg-slate-900 border border-white/10 rounded-full py-3 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  onMouseEnter={playHover}
                  className="absolute right-2 p-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
