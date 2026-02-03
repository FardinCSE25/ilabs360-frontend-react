import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Share2, Mail, Link2, Check, ExternalLink, 
  Facebook, Twitter, Linkedin, MessageCircle,
  Briefcase, Building2, Calendar, User
} from "lucide-react";

const BlogPublisher = ({ blog }) => {
  const staff = blog?.staff;
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Safely handle window object for SSR/Next.js compatibility
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!staff) {
    return (
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center py-12 border-t border-gray-100">
          <p className="text-gray-400 font-medium">Author information unavailable.</p>
        </div>
      </section>
    );
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`Check out this article: ${currentUrl}`)}`
  };

  const copyToClipboard = (text, type = 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  // Standardized professional icons for stats
  const authorStats = [
    { label: "Role", value: staff.designation, icon: <Briefcase className="w-4 h-4" /> },
    { label: "Dept", value: staff.department, icon: <Building2 className="w-4 h-4" /> },
    { label: "Tenure", value: staff.years_in_company ? `${staff.years_in_company}y` : null, icon: <Calendar className="w-4 h-4" /> },
    { label: "Identity", value: staff.age ? `${staff.age} yrs` : null, icon: <User className="w-4 h-4" /> },
  ].filter(stat => stat.value);

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white md:rounded-2xl rounded-md p-6 md:p-10 border border-gray-100 shadow-sm"
      >
        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="relative group">
            <img
              src={staff.image || 'https://via.placeholder.com/150'}
              alt={staff.name}
              className="w-28 h-28 md:rounded-2xl rounded-md object-cover ring-4 ring-gray-50 shadow-sm"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">Published By</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{staff.name}</h3>
            <p className="text-gray-500 font-medium mb-4">{staff.designation} <span className="mx-2 text-gray-300">|</span> {staff.department}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {staff.email && (
                <button
                  onClick={() => copyToClipboard(staff.email, 'email')}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4" />}
                  {emailCopied ? "Email Copied" : "Copy Email"}
                </button>
              )}
              {staff.website && (
                <a
                  href={staff.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
                >
                  <ExternalLink className="w-4 h-4" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Professional Stats Bar */}
        {authorStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-10">
            {authorStats.map((stat, index) => (
              <div key={index} className="bg-white p-4 flex flex-col items-center justify-center gap-1">
                <div className="text-gray-400">{stat.icon}</div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{stat.label}</div>
                <div className="text-sm font-semibold text-gray-800">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Share Action Area */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xs">
              <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                Spread the word
              </h4>
              <p className="text-sm text-gray-500 mt-1">Found this useful? Share it with your professional network.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: shareUrls.facebook, label: "Facebook" },
                { icon: <Twitter className="w-4 h-4" />, href: shareUrls.twitter, label: "Twitter" },
                { icon: <Linkedin className="w-4 h-4" />, href: shareUrls.linkedin, label: "LinkedIn" },
                { icon: <MessageCircle className="w-4 h-4" />, href: shareUrls.whatsapp, label: "WhatsApp" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all hover:shadow-md"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
              
              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />

              <button
                onClick={() => copyToClipboard(currentUrl)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  linkCopied 
                  ? 'bg-green-50 text-green-700 ring-1 ring-green-200' 
                  : 'bg-gray-900 text-white hover:bg-black active:scale-95'
                }`}
              >
                {linkCopied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {linkCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogPublisher;