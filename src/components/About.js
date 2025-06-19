import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiStar, FiZap, FiCode, FiDollarSign } from "react-icons/fi";

export default function About({ mode }) {
  const darkMode = mode === 'dark';
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const accordionItems = [
    {
      id: 1,
      title: "Features of WizzText",
      icon: <FiZap className="mr-2" />,
      content: (
        <>
          <p className="mb-4">
            WizzText offers a range of powerful and easy-to-use text manipulation features:
          </p>
          <ul className="space-y-3">
            {[
              "Convert text to uppercase or lowercase",
              "Remove extra spaces effortlessly",
              "Count words and characters in real-time",
              "Markdown support with live preview",
              "Estimated reading time calculation"
            ].map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <FiStar className="mt-1 mr-2 flex-shrink-0 text-yellow-500" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <motion.p 
            className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            Whether you're editing documents, writing code, or refining text, WizzText makes text processing effortless. 🚀
          </motion.p>
        </>
      )
    },
    {
      id: 2,
      title: "About Our Mission",
      icon: <FiCode className="mr-2" />,
      content: (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <p>
              Welcome to <span className="font-bold text-blue-600 dark:text-blue-400">WizzText</span>, your ultimate text manipulation tool! We believe that working with text should be simple and efficient.
            </p>
            <p>
              Our mission is to provide a fast, reliable, and user-friendly text editing experience. We're constantly improving and adding new features to make text processing smoother for you.
            </p>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="font-medium">Join thousands of satisfied users who trust WizzText for their daily text processing needs!</p>
            </div>
          </motion.div>
        </>
      )
    },
    {
      id: 3,
      title: "Pricing Plans",
      icon: <FiDollarSign className="mr-2" />,
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <p className="font-medium">We offer flexible pricing plans:</p>
          {[
            { name: "Free Plan", desc: "Basic text tools", price: "$0/month", delay: 0 },
            { name: "Pro Plan", desc: "Advanced features", price: "$5/month", delay: 0.1 },
            { name: "Enterprise", desc: "API access", price: "$15/month", delay: 0.2 }
          ].map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: plan.delay }}
              className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ y: -3 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{plan.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{plan.desc}</p>
                </div>
                <span className="font-bold">{plan.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    }
  ];

  const toggleAccordion = (id) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          About WizzText
        </motion.h2>

        <div className="space-y-6">
          {accordionItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`rounded-xl overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <motion.button
                layout
                onClick={() => toggleAccordion(item.id)}
                className={`w-full p-5 text-left flex justify-between items-center font-medium ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } transition-colors`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {expandedAccordion === item.id ? <FiChevronUp /> : <FiChevronDown />}
              </motion.button>

              <AnimatePresence>
                {expandedAccordion === item.id && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-5 pb-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 p-6 rounded-xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <h3 className="text-xl font-bold mb-3">Ready to get started?</h3>
          <p className="mb-4">Join thousands of users who trust WizzText for their text processing needs</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-medium ${
              darkMode
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            } shadow-lg`}
          >
            Try WizzText Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

About.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired
};