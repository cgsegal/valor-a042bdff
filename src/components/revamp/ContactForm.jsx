import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    // Simulate API call to submit form
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setStatus('success');
    // Reset form after a short delay
    setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-3 bg-black p-8 rounded-lg"
    >
      <h2 className="text-3xl font-display mb-2 text-white">Direct Inquiry</h2>
      <p className="text-white/60 mb-8 font-light">
        Submit your request and a concierge will be in touch shortly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white h-12"
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white h-12"
          />
        </div>
        <div>
          <Textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white"
          />
        </div>
        <div>
          <Button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-white text-black hover:bg-white/80 font-bold transition-all h-12 text-md"
          >
            {status === 'sending' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === 'success' ? 'Message Sent' : 'Send Inquiry'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}