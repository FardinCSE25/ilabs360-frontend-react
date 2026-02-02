import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Bookmark, Printer, Maximize2, Minimize2, ChevronRight, Globe } from "lucide-react";

const DetBlogs = ({ blog }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeHeading, setActiveHeading] = useState(null);
  const [language, setLanguage] = useState("english"); // "english" or "bangla"

  // Process content based on selected language
  const getContentForLanguage = () => {
    if (language === "bangla") {
      return blog.content_bng || blog.content || "";
    }
    return blog.content || "";
  };

  const getSummaryForLanguage = () => {
    if (language === "bangla") {
      return blog.summary_bng || blog.summary || "";
    }
    return blog.summary || "";
  };

  const getTitleForLanguage = () => {
    if (language === "bangla") {
      return blog.title_bng || blog.title || "";
    }
    return blog.title || "";
  };

  // Process content to add proper spacing
  const processedContent = getContentForLanguage();
  
  const formattedContent = processedContent
    .replace(/<p><\/p>/g, '')
    .replace(/<p>/g, '<p class="mb-6">')
    .replace(/<li>/g, '<li class="mb-2">')
    .replace(/<h1>/g, '<h1 class="mt-10 mb-6">')
    .replace(/<h2>/g, '<h2 class="mt-8 mb-4">')
    .replace(/<h3>/g, '<h3 class="mt-6 mb-3">')
    .replace(/<h4>/g, '<h4 class="mt-4 mb-2">')
    .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
    .replace(/<em>/g, '<em class="italic text-gray-700">')
    .replace(/<a /g, '<a class="text-primary hover:text-primary/80 underline hover:no-underline transition-colors" ');

  // Extract headings for table of contents
  const tableOfContents = (() => {
    const content = getContentForLanguage();
    const headings = [];
    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]+>/g, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      
      headings.push({
        id,
        text,
        level
      });
    }
    
    return headings;
  })();

  // Scroll to heading
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  // Check if blog is already bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]');
    setIsBookmarked(bookmarks.includes(blog?.id));
  }, [blog?.id]);

  // Handle bookmark toggle
  const toggleBookmark = () => {
    if (!blog?.id) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]');
    
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(id => id !== blog.id);
      localStorage.setItem('bookmarkedBlogs', JSON.stringify(newBookmarks));
      setIsBookmarked(false);
    } else {
      const newBookmarks = [...bookmarks, blog.id];
      localStorage.setItem('bookmarkedBlogs', JSON.stringify(newBookmarks));
      setIsBookmarked(true);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Print article
  const printArticle = () => {
    window.print();
  };

  // Share article
  const shareArticle = async () => {
    if (!blog) return;
    
    const title = getTitleForLanguage();
    const summary = getSummaryForLanguage();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary?.replace(/<[^>]+>/g, '').substring(0, 200) || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!blog) return null;

  const hasBanglaContent = blog.content_bng && blog.content_bng.trim() !== "" && blog.content_bng !== "<p></p>";

  return (
    <>
      {/* Language Toggle Button - Top Right Corner */}
      {hasBanglaContent && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="fixed top-6 right-6 z-40"
        >
          <div className="relative">
            <button
              onClick={() => setLanguage(language === "english" ? "bangla" : "english")}
              className="flex items-center gap-2 bg-white shadow-xl rounded-full px-4 py-3 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <Globe className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm font-medium text-gray-800">
                {language === "english" ? "বাংলা" : "English"}
              </span>
              <div className="flex items-center">
                <motion.div
                  key={language}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-6 h-6 rounded-full overflow-hidden border border-gray-300"
                >
                  {language === "english" ? (
                    <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      EN
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-red-500 to-green-600 flex items-center justify-center text-xs font-bold text-white">
                      BN
                    </div>
                  )}
                </motion.div>
              </div>
            </button>
            
            {/* Language Indicator Tooltip */}
            <AnimatePresence>
              {language === "bangla" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-primary text-white text-xs px-3 py-1.5 rounded-lg shadow-lg"
                >
                  বাংলা ভাষায় পড়ছেন
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Floating Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3"
      >
        <button
          onClick={shareArticle}
          className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all duration-300 group"
          title="Share"
        >
          <Share2 className="w-5 h-5 text-gray-700 group-hover:text-primary" />
        </button>
        
        <button
          onClick={toggleBookmark}
          className={`p-3 shadow-lg rounded-full transition-all duration-300 group ${
            isBookmarked 
              ? 'bg-yellow-50 text-yellow-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700'
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
        >
          <Bookmark className={`w-5 h-5 group-hover:text-yellow-600 ${
            isBookmarked ? 'fill-yellow-600' : ''
          }`} />
        </button>
        
        <button
          onClick={printArticle}
          className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all duration-300 group"
          title="Print"
        >
          <Printer className="w-5 h-5 text-gray-700 group-hover:text-primary" />
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all duration-300 group"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-gray-700 group-hover:text-primary" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-700 group-hover:text-primary" />
          )}
        </button>
      </motion.div>

      {/* Main Content */}
      <section className={`max-w-4xl mx-auto px-4 py-12 md:py-16 ${
        isFullscreen ? 'max-w-full px-8' : ''
      }`}>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-none"
        >
          {/* Language Alert Banner */}
          {language === "bangla" && hasBanglaContent && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">🇧🇩</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">বাংলা ভাষায় পড়ছেন</h3>
                <p className="text-sm text-green-700">
                  এই নিবন্ধটি বাংলায় অনুবাদ করা হয়েছে। ইংরেজি ভাষায় স্যুইচ করতে উপরের বাটনে ক্লিক করুন।
                </p>
              </div>
            </motion.div>
          )}

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="mb-12 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2z"/>
                </svg>
                {language === "english" ? "Table of Contents" : "সূচিপত্র"}
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((heading, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`flex items-center gap-2 text-left w-full p-2 rounded-lg transition-colors ${
                      activeHeading === heading.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeHeading === heading.id ? 'rotate-90' : ''
                    }`} />
                    <span style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}>
                      {heading.text}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Blog Content with Proper Spacing */}
          <div className="prose prose-lg md:prose-xl max-w-none">
            <div className="space-y-8">
              {/* Title in selected language */}
              {language === "bangla" && blog.title_bng && (
                <motion.h1
                  key="bangla-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  {blog.title_bng}
                </motion.h1>
              )}

              {/* Processed Content */}
              <motion.div
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                id="blog-content"
                className={`blog-content ${language === "bangla" ? 'bangla-font' : ''}`}
                dangerouslySetInnerHTML={{ 
                  __html: formattedContent || 
                    (language === "bangla" 
                      ? '<p class="text-gray-500 italic text-center py-8">এই নিবন্ধটি এখনো বাংলায় অনুবাদ করা হয়নি।</p>' 
                      : '<p class="text-gray-500 italic">No content available.</p>') 
                }}
              />

              {/* Additional Spacing for better readability */}
              {getSummaryForLanguage() && (
                <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {language === "english" ? "Key Takeaways" : "প্রধান বিষয়বস্তু"}
                  </h4>
                  <div 
                    className={`text-blue-800 ${language === "bangla" ? 'bangla-font' : ''}`}
                    dangerouslySetInnerHTML={{ 
                      __html: getSummaryForLanguage() 
                    }}
                  />
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/>
                    </svg>
                    {language === "english" ? "Tags" : "ট্যাগসমূহ"}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                    <span>
                      {Math.ceil((getContentForLanguage().length || 0) / (language === "bangla" ? 800 : 1000))} 
                      {language === "english" ? " min read" : " মিনিট পড়া"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                    <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Mobile Action Bar */}
        <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            {/* Language Toggle for Mobile */}
            {hasBanglaContent && (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setLanguage(language === "english" ? "bangla" : "english")}
                  className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {language === "english" ? "বাংলায় পড়ুন" : "Read in English"}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    language === "english" 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {language === "english" ? "EN" : "BN"}
                  </span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={shareArticle}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {language === "english" ? "Share" : "শেয়ার করুন"}
              </button>
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-600' : ''}`} />
                {isBookmarked 
                  ? (language === "english" ? "Bookmarked" : "বুকমার্ক করা") 
                  : (language === "english" ? "Bookmark" : "বুকমার্ক")
                }
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #374151;
        }
        
        .blog-content ul, .blog-content ol {
          margin-top: 0.75rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        
        .blog-content h2 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #111827;
          font-weight: 700;
          font-size: 1.875rem;
        }
        
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
          font-weight: 600;
          font-size: 1.5rem;
        }
        
        .blog-content blockquote {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          border-left: 4px solid #3b82f6;
          font-style: italic;
          color: #4b5563;
        }
        
        .blog-content strong {
          color: #111827;
          font-weight: 600;
        }
        
        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .blog-content a:hover {
          color: #2563eb;
          text-decoration: none;
        }
        
        /* Bengali font support */
        .bangla-font {
          font-family: 'Noto Sans Bengali', 'SolaimanLipi', 'Siyam Rupali', Arial, sans-serif;
          line-height: 1.9;
        }
        
        .bangla-font h1,
        .bangla-font h2,
        .bangla-font h3,
        .bangla-font h4 {
          font-family: 'Noto Sans Bengali', 'SolaimanLipi', 'Siyam Rupali', Arial, sans-serif;
        }
        
        .bangla-font p {
          text-align: justify;
          font-size: 1.125rem;
        }
      `}</style>
    </>
  );
};

export default DetBlogs;