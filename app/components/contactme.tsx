'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CONFIG } from '../utils/config';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      description: ''
    };
    let hasError = false;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Meow! Forgot your first name!";
      hasError = true;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required too!";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = "I need your email to reply!";
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "That doesn't look like a valid email...";
      hasError = true;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Don't leave me hanging, write a message!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');
    
    try {
      if (!CONFIG.GOOGLE_SCRIPT_URL) {
        throw new Error('Google Script URL is missing');
      }

      await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', description: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative bg-[#0e172a] pt-32 pb-24 z-10 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-cat {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes spin-cat {
          0% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1.2) rotate(360deg); }
        }
        @keyframes happy-bounce {
          0%, 100% { transform: translateY(0) scale(1.2); }
          50% { transform: translateY(-40px) scale(1.2); }
        }
        @keyframes sad-shake {
          0%, 100% { transform: translateX(0) scale(0.9); }
          25% { transform: translateX(-15px) scale(0.9) rotate(-10deg); }
          75% { transform: translateX(15px) scale(0.9) rotate(10deg); }
        }
        .cat-idle { animation: float-cat 4s ease-in-out infinite; }
        .cat-submitting { animation: spin-cat 0.5s linear infinite; }
        .cat-success { animation: happy-bounce 0.5s ease-in-out infinite; }
        .cat-error { animation: sad-shake 0.4s ease-in-out infinite; }
      `}} />

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[120px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-30 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-left space-y-8">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white mb-6">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#45a1d4] to-[#1be88b]">
                Unstable.
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 font-medium max-w-lg mb-8">
              Got an idea, a question, or just want to chat about games? Drop me a message and let's connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-[#F9C462] group-hover:bg-[#F9C462] group-hover:text-black transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Name</p>
                  <p className="text-lg text-white font-medium">Oliver Green</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-[#E46362] group-hover:bg-[#E46362] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:oliver.r.green1@gmail.com" className="text-lg text-white font-medium hover:text-[#E46362] transition-colors">oliver.r.green1@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-[#45a1d4] group-hover:bg-[#45a1d4] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:07340110025" className="text-lg text-white font-medium hover:text-[#45a1d4] transition-colors">07340 110025</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-[#1be88b] group-hover:bg-[#1be88b] group-hover:text-gray-900 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-lg text-white font-medium">Cambridge, UK</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative mt-16 sm:mt-0">
            <div className={`absolute -top-20 -right-6 sm:right-6 w-32 h-32 z-20 pointer-events-none transition-all duration-300
              ${status === 'idle' ? 'cat-idle' : ''}
              ${status === 'submitting' ? 'cat-submitting' : ''}
              ${status === 'success' ? 'cat-success' : ''}
              ${status === 'error' ? 'cat-error' : ''}
            `}>
              <Image src="/Assets/cat.png" alt="Unstable Cat" fill className="object-contain drop-shadow-2xl" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-bold text-gray-600 uppercase tracking-wide">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.firstName ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none focus:border-[#45a1d4] focus:bg-white transition-all font-medium text-gray-900`}
                    placeholder="Jesal"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs font-bold animate-pulse">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-bold text-gray-600 uppercase tracking-wide">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.lastName ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none focus:border-[#45a1d4] focus:bg-white transition-all font-medium text-gray-900`}
                    placeholder="Vee"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs font-bold animate-pulse">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-600 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.email ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none focus:border-[#E46362] focus:bg-white transition-all font-medium text-gray-900`}
                  placeholder="jesalvadgama@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-xs font-bold animate-pulse">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-gray-600 uppercase tracking-wide">Number <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#F9C462] focus:bg-white transition-all font-medium text-gray-900"
                  placeholder="+44 7941 344450"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-bold text-gray-600 uppercase tracking-wide">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.description ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none focus:border-[#1be88b] focus:bg-white transition-all font-medium text-gray-900 resize-none`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs font-bold animate-pulse">{errors.description}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-[#E46362] to-[#F9C462] text-white font-black text-lg rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(228,99,98,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="bg-[#1be88b]/10 text-[#12a160] border border-[#1be88b]/30 rounded-lg p-4 font-bold text-center mt-4">
                  Awesome! Message sent successfully. I'll be in touch soon.
                </div>
              )}
              {status === 'error' && Object.keys(errors).length === 0 && (
                <div className="bg-[#E46362]/10 text-[#c74c4b] border border-[#E46362]/30 rounded-lg p-4 font-bold text-center mt-4">
                  Oops! Server got unstable. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}