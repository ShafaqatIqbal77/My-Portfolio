import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { personal } from '../../data/personal';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulating API call for now since no EmailJS credentials are provided
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully!');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899']
      });
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: personal.email, color: "text-blue-500" },
    { icon: Phone, label: "Phone", value: personal.phone, color: "text-green-500" },
    { icon: MapPin, label: "Location", value: personal.location, color: "text-red-500" },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column - Contact Info */}
          <div className="flex-1">
            <SectionHeading 
              subtitle="Get In Touch"
              title="Let's Work Together!"
              description="Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and interesting projects."
            />

            <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 sm:gap-6 glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[var(--border)] group hover:border-primary/50 transition-all"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform shadow-xl shrink-0`}>
                    <info.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1">{info.label}</p>
                    <p className="text-sm sm:text-lg font-bold truncate">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { icon: Github, href: personal.github },
                { icon: Linkedin, href: personal.linkedin },
                { icon: Twitter, href: personal.twitter },
                { icon: Instagram, href: personal.instagram }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary transition-all"
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="mt-8 sm:mt-12 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl glass border border-green-500/30">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="font-bold text-green-500 italic text-xs sm:text-sm">Currently Available for New Projects</span>
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 mt-8 lg:mt-0"
          >
            <div className="glass p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-[40px] border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 sm:ml-2">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-4 py-3 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] focus:border-primary outline-none transition-all text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Iqbal"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] sm:text-xs ml-1 sm:ml-2">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 sm:ml-2">Email Address</label>
                    <input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      className={`w-full px-4 py-3 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] focus:border-primary outline-none transition-all text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Iqbal@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] sm:text-xs ml-1 sm:ml-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 sm:ml-2">Your Message</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    className={`w-full px-4 py-3 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] focus:border-primary outline-none transition-all resize-none text-sm sm:text-base ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-[10px] sm:text-xs ml-1 sm:ml-2">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                  icon={isSubmitting ? Loader2 : Send}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
