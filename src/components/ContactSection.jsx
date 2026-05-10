import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ContactSection = () => {
  const { contactInfo } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary-500 font-black tracking-[0.2em] text-xs mb-4 uppercase"
          >
            Get In Touch
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-black text-white">Let's <span className="text-primary-500">Connect</span></h2>
        </div>
        <p className="text-gray-400 max-w-sm text-sm font-medium">
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-16 items-start max-w-7xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-morphism p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-black mb-10 relative z-10">Contact Info</h3>
            
            <div className="space-y-10 relative z-10">
              {[
                { icon: Mail, label: 'Email', value: contactInfo.email, sub: 'Available for freelance' },
                { icon: MapPin, label: 'Location', value: contactInfo.location, sub: 'Based in India' },
                { icon: Phone, label: 'Phone', value: contactInfo.phone, sub: 'Mon - Fri, 9am - 6pm' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group/item">
                  <div className="p-4 bg-primary-500/10 text-primary-500 rounded-2xl group-hover/item:bg-primary-500 group-hover/item:text-white transition-all duration-500">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-white mb-0.5">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass-morphism p-10 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all text-white placeholder:text-gray-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all text-white placeholder:text-gray-600"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
              <textarea
                required
                rows="6"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all text-white placeholder:text-gray-600 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn-primary py-5 flex items-center justify-center gap-3 disabled:opacity-50 text-base"
            >
              {status === 'sending' ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === 'success' ? (
                "Message Sent Successfully!"
              ) : (
                <>
                  Send Message <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
