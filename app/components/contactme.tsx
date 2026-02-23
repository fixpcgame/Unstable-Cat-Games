'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CONFIG } from '../utils/config';

const COOLDOWN_PERIOD = 180000;
const STORAGE_KEY = 'last_form_submission';

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

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'>('idle');
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  useEffect(() => {
    const lastSub = localStorage.getItem(STORAGE_KEY);
    if (lastSub) {
      const timePassed = Date.now() - parseInt(lastSub);
      if (timePassed < COOLDOWN_PERIOD) {
        setIsCooldownActive(true);
        const timer = setTimeout(() => setIsCooldownActive(false), COOLDOWN_PERIOD - timePassed);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastSub = localStorage.getItem(STORAGE_KEY);
    if (lastSub && Date.now() - parseInt(lastSub) < COOLDOWN_PERIOD) {
      setStatus('rate-limited');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
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
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!formData.email.trim()) {
      newErrors.email = "I need your email to reply!";
      hasError = true;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "That email format looks a bit unstable...";
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
      
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setIsCooldownActive(true);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', description: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

      setTimeout(() => setIsCooldownActive(false), COOLDOWN_PERIOD);
      
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
        .cat-rate-limited { filter: grayscale(1); animation: sad-shake 1s infinite; }
      `}} />

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[120px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-30 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white mb-6">
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#45a1d4] to-[#1be88b]">
              Unstable.
            </span>
          </h2>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            Got an idea, a question, or just want to chat? Drop me a message below.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden xl:block pointer-events-none">
            <div className="absolute -left-64 top-4 w-44 h-44 transition-transform duration-500 hover:rotate-12">
              <Image src="/Assets/frog.PNG" alt="Frog" fill className="object-contain rotate-[-18deg]" />
            </div>
            <div className="absolute -left-56 bottom-4 w-36 h-36 transition-transform duration-500 hover:rotate-[-12deg]">
              <Image src="/Assets/fixpc.png" alt="Fix PC" fill className="object-contain rotate-[14deg]" />
            </div>
            
            <div className="absolute -right-60 top-1/4 w-48 h-48 transition-transform duration-500 hover:scale-110">
              <Image src="/Assets/rightthatsit.png" alt="That is it" fill className="object-contain rotate-[22deg]" />
            </div>
            <div className="absolute -right-52 bottom-12 w-32 h-32 transition-transform duration-500 hover:rotate-[20deg]">
              <Image src="/Assets/boost.png" alt="Boost" fill className="object-contain rotate-[-15deg]" />
            </div>
          </div>

          <div className={`absolute -top-16 -right-4 sm:-right-12 w-32 h-32 z-[60] pointer-events-none transition-all duration-300
            ${status === 'idle' ? 'cat-idle' : ''}
            ${status === 'submitting' ? 'cat-submitting' : ''}
            ${status === 'success' ? 'cat-success' : ''}
            ${status === 'error' ? 'cat-error' : ''}
            ${status === 'rate-limited' ? 'cat-rate-limited' : ''}
          `}>
            <Image src="/Assets/cat.png" alt="Unstable Cat" fill className="object-contain drop-shadow-2xl" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-left">
            {status === 'success' && (
              <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-[#1be88b] rounded-full flex items-center justify-center mb-4 scale-in shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900">Thanks for reaching out!</h3>
                <p className="text-gray-500 font-bold mt-2">Don't have a good day, have a great day.</p>
              </div>
            )}

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
                  placeholder="example@gmail.com"
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
                disabled={status === 'submitting' || isCooldownActive}
                className="w-full py-4 bg-gradient-to-r from-[#E46362] to-[#F9C462] text-white font-black text-lg rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(228,99,98,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'submitting' ? 'Sending...' : 
                 isCooldownActive ? 'Wait 3 min for another message' : 'Send Message'}
              </button>

              {status === 'rate-limited' && (
                <div className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg p-4 font-bold text-center mt-4">
                  Slow down! Please wait 3 minutes before sending another.
                </div>
              )}

              {status === 'error' && Object.keys(errors).length === 0 && (
                <div className="bg-[#E46362]/10 text-[#c74c4b] border border-[#E46362]/30 rounded-lg p-4 font-bold text-center mt-4">
                  Oops! Server got unstable. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}