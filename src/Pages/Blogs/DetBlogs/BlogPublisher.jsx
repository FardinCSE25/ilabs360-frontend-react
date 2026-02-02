import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTwitter, 
  FaLink, FaEnvelope, FaCopy 
} from "react-icons/fa";
import { Check, Mail, ExternalLink } from "lucide-react";

const BlogPublisher = ({ blog }) => {
  const staff = blog?.staff;
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!staff) {
    return (
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center py-12 border-t border-gray-200">
          <p className="text-gray-500">No author information available.</p>
        </div>
      </section>
    );
  }

  // Social sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`,
    email: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`
  };

  // Copy link to clipboard
  const copyToClipboard = (text, type = 'link') => {
    navigator.clipboard.writeText(text);
    
    if (type === 'link') {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else if (type === 'email') {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  // Author stats
  const authorStats = [
    { label: "Role", value: staff.designation, icon: "👨‍💼" },
    { label: "Department", value: staff.department, icon: "🏢" },
    { label: "Experience", value: staff.years_in_company ? `${staff.years_in_company} years` : "N/A", icon: "⏳" },
    { label: "Age", value: staff.age ? `${staff.age} years` : "N/A", icon: "🎂" },
  ].filter(stat => stat.value && stat.value !== "N/A");

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Author Avatar */}
          <div className="relative">
            <img
              src={staff.image || 'https://via.placeholder.com/100'}
              alt={staff.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Author
            </div>
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{staff.name}</h3>
            <p className="text-gray-600 mb-4">{staff.designation} • {staff.department}</p>
            
            {/* Bio */}
            {/* {staff.bio && (
              <p className="text-gray-700">{staff.bio}</p>
            )} */}
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            {staff.email && (
              <button
                onClick={() => copyToClipboard(staff.email, 'email')}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{emailCopied ? "Copied!" : "Copy Email"}</span>
                {emailCopied && <Check className="w-4 h-4 text-green-600" />}
              </button>
            )}
            
            {staff.website && (
              <a
                href={staff.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Author Stats Grid */}
        {authorStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-white rounded-xl border border-gray-100">
            {authorStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="font-semibold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Share Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Share this article</h4>
              <p className="text-gray-600 text-sm">
                Help spread the knowledge! Share with your network.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Social Share Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors transform hover:scale-105"
                  title="Share on Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors transform hover:scale-105"
                  title="Share on Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors transform hover:scale-105"
                  title="Share on LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors transform hover:scale-105"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                
                <a
                  href={shareUrls.email}
                  className="p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors transform hover:scale-105"
                  title="Share via Email"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>
              </div>

              {/* Copy Link Section */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 truncate">
                  {window.location.href}
                </div>
                <button
                  onClick={() => copyToClipboard(window.location.href)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    linkCopied
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3 h-3" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Articles by Author */}
          {staff.recent_articles && staff.recent_articles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                More from {staff.name.split(' ')[0]}
              </h4>
              <div className="grid gap-4">
                {staff.recent_articles.slice(0, 3).map((article, index) => (
                  <a
                    key={index}
                    href={`/blogs/${article.slug}`}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <h5 className="font-medium text-gray-900 mb-1">{article.title}</h5>
                    <p className="text-sm text-gray-500">
                      {new Date(article.published_at).toLocaleDateString()}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogPublisher;