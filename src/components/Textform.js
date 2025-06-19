import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiFileText, FiFile, FiMaximize2, FiMinimize2, FiVolume2 } from "react-icons/fi";
import Confetti from 'react-confetti';

// Testimonial data array
const testimonials = [
  {
    id: 1,
    quote: "The research hub is a game changer for collaboration. Finding the right team members has never been easier.",
    rating: 5,
    initials: "JS",
    name: "John Smith",
    role: "Researcher",
    color: "bg-blue-500"
  },
  {
    id: 2,
    quote: "This tool has revolutionized how our team works together across different time zones.",
    rating: 5,
    initials: "AM",
    name: "Alice Miller",
    role: "Team Lead",
    color: "bg-purple-500"
  },
  {
    id: 3,
    quote: "The seamless integration with our existing workflow saved us countless hours of manual work.",
    rating: 4,
    initials: "RJ",
    name: "Robert Johnson",
    role: "CTO",
    color: "bg-green-500"
  }
];

// Button configuration array for easy management
const buttonActions = [
  {
    name: "UPPERCASE",
    icon: null,
    color: "bg-blue-600 hover:bg-blue-700",
    handler: "handleUpClick"
  },
  {
    name: "lowercase",
    icon: null,
    color: "bg-blue-600 hover:bg-blue-700",
    handler: "handleLoClick"
  },
  {
    name: "Remove Spaces",
    icon: null,
    color: "bg-purple-600 hover:bg-purple-700",
    handler: "handleExtraSpaces"
  },
  {
    name: "Clear Text",
    icon: null,
    color: "bg-red-600 hover:bg-red-700",
    handler: "handleClearClick"
  },
  {
    name: "Copy",
    icon: <FiCopy />,
    color: "bg-green-600 hover:bg-green-700",
    handler: "handleCopyToClipboard"
  },
  {
    name: "TXT",
    icon: <FiFileText />,
    color: "bg-teal-600 hover:bg-teal-700",
    handler: "handleExportTxt"
  },
  {
    name: "PDF",
    icon: <FiFile />,
    color: "bg-pink-600 hover:bg-pink-700",
    handler: "handleExportPdf"
  },
  {
    name: "Speak",
    icon: <FiVolume2 />,
    color: "bg-indigo-600 hover:bg-indigo-700",
    handler: "handleTextToSpeech"
  }
];

export default function Textform({ mode, toggleMode, showAlert }) {
  // State management
  const [text, setText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);
  
  // Text analysis calculations
  const wordsArray = text.trim().split(/\s+|\n+/).filter((word) => word.length > 0);
  const wordCount = wordsArray.length;
  const charCount = text.length;
  const readingTime = (0.008 * wordCount).toFixed(2);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      setSpeech(utterance);
      
      // Clean up on unmount
      return () => {
        synth.cancel();
      };
    } else {
      showAlert("Text-to-speech not supported in your browser", "warning");
    }
  }, []);

  // Animate buttons one by one on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleButtons.length < buttonActions.length) {
        setVisibleButtons(prev => [...prev, buttonActions[prev.length]]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [visibleButtons]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialDirection(1);
      setCurrentTestimonialIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  /**
   * TEXT MANIPULATION HANDLERS
   */
  const handleUpClick = () => {
    setText(text.toUpperCase());
    showAlert("Converted to UpperCase", "success");
    triggerConfetti();
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    showAlert("Converted to LowerCase", "success");
    triggerConfetti();
  };

  const handleClearClick = () => {
    setText("");
    showAlert("Text cleared", "success");
  };

  const handleExtraSpaces = () => {
    setText(text.replace(/\s+/g, " ").trim());
    showAlert("Extra spaces removed", "success");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    showAlert("Text copied to clipboard", "success");
    triggerConfetti();
  };

  const handleExportTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text-export.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showAlert("Text exported as TXT", "success");
    triggerConfetti();
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("text-export.pdf");
    showAlert("Text exported as PDF", "success");
    triggerConfetti();
  };

  // Text-to-speech handler
  const handleTextToSpeech = () => {
    if (!text) {
      showAlert("Please enter some text to speak", "warning");
      return;
    }

    const synth = window.speechSynthesis;
    
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      showAlert("Speech stopped", "info");
      return;
    }

    if (speech) {
      speech.text = text;
      speech.onend = () => {
        setIsSpeaking(false);
        showAlert("Speech completed", "success");
      };
      speech.onerror = (event) => {
        console.error("SpeechSynthesis error:", event);
        setIsSpeaking(false);
        showAlert("Error occurred during speech", "danger");
      };

      synth.speak(speech);
      setIsSpeaking(true);
      showAlert("Speaking...", "info");
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Confetti effect for celebrations */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      {/* Header section with title only (dark mode toggle removed) */}
      <header className="mb-8">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent"
        >
          Wizz<span className="text-pink-500">Text</span>
        </motion.h1>
      </header>

      {/* Main Content - Split Layout */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Section - Text Input and Analysis */}
        <motion.section
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          {/* Text Input Card */}
          <div className={`rounded-xl shadow-lg p-4 md:p-6 h-full transition-all duration-300 ${
            mode === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Text Analyzer</h2>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
              </button>
            </div>
            
            {/* Textarea for user input */}
            <textarea
              value={text}
              onChange={handleOnChange}
              placeholder="Type or paste your text here..."
              rows={isExpanded ? 12 : 6}
              className={`w-full p-3 md:p-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                mode === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}
            />

            {/* Stats Section */}
            <div className={`mt-4 md:mt-6 rounded-lg p-3 md:p-4 ${
              mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className="text-md md:text-lg font-semibold mb-3">Text Analytics</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
                <div>
                  <div className="text-xl md:text-2xl font-bold">{wordCount}</div>
                  <div className="text-xs md:text-sm opacity-80">Words</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">{charCount}</div>
                  <div className="text-xs md:text-sm opacity-80">Characters</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">{readingTime}</div>
                  <div className="text-xs md:text-sm opacity-80">Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Right Section - Action Buttons and Preview */}
        <motion.section
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className={`rounded-xl shadow-lg p-4 md:p-6 h-full ${
            mode === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Action Buttons Section */}
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Text Transformations</h2>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <AnimatePresence>
                {visibleButtons.map((button, index) => (
                  <motion.button
                    key={button.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Using a function map instead of eval for better practice
                      const handlers = {
                        handleUpClick,
                        handleLoClick,
                        handleExtraSpaces,
                        handleClearClick,
                        handleCopyToClipboard,
                        handleExportTxt,
                        handleExportPdf,
                        handleTextToSpeech
                      };
                      handlers[button.handler]();
                    }}
                    className={`py-2 md:py-3 px-3 md:px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 text-sm md:text-base ${
                      button.color
                    } ${button.handler === 'handleTextToSpeech' && isSpeaking ? 'animate-pulse' : ''}`}
                  >
                    {button.icon && <span>{button.icon}</span>}
                    {button.handler === 'handleTextToSpeech' && isSpeaking ? 'Stop' : button.name}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Preview Section */}
            <div className={`mt-4 md:mt-6 rounded-lg p-3 md:p-4 ${
              mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className="text-md md:text-lg font-semibold mb-3">Live Preview</h3>
              <div className="whitespace-pre-wrap min-h-24 max-h-60 overflow-y-auto">
                {text.length > 0 ? text : "Your formatted text will appear here..."}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Testimonials Section */}
      <section className="my-8 md:my-12">
        <div className="p-4 md:p-8 text-center">
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 md:mb-4 ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Trusted by innovators
          </h2>
          <p className={`text-md md:text-xl mb-6 md:mb-8 ${
            mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of professionals who've transformed their careers
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait" custom={testimonialDirection}>
            <motion.div
              key={currentTestimonial.id}
              custom={testimonialDirection}
              initial={{ opacity: 0, x: testimonialDirection > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: testimonialDirection > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className={`p-6 md:p-8 rounded-xl shadow-lg mx-4 ${
                mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <p className="text-md md:text-lg italic mb-4 md:mb-6">
                "{currentTestimonial.quote}"
              </p>
              <div className="flex text-yellow-400 mb-3 md:mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
                {[...Array(5 - currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current text-gray-400" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <div className="flex items-center">
                <div className={`${currentTestimonial.color} text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 text-lg`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-md md:text-lg">{currentTestimonial.name}</p>
                  <p className="text-sm md:text-md opacity-75">{currentTestimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button 
            onClick={() => {
              setTestimonialDirection(-1);
              setCurrentTestimonialIndex(prev => 
                prev === 0 ? testimonials.length - 1 : prev - 1
              );
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-4 bg-white text-darkbg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => {
              setTestimonialDirection(1);
              setCurrentTestimonialIndex(prev => 
                prev === testimonials.length - 1 ? 0 : prev + 1
              );
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-4 bg-white text-dark bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setTestimonialDirection(index > currentTestimonialIndex ? 1 : -1);
                  setCurrentTestimonialIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentTestimonialIndex 
                    ? 'bg-blue-500 dark:bg-blue-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}