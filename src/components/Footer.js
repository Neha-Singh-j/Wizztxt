import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaRocket, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer({ mode }) {
  const canvasRef = useRef(null);
  
  // 3D Background Effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = 300;
      
      const particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 100;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: mode === 'dark' ? 
            `rgba(139, 92, 246, ${Math.random()})` : 
            `rgba(96, 165, 250, ${Math.random()})`
        });
      }
      
      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Movement
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Boundary check
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(animate);
      }
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = 300;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [mode]);

  return (
    <footer className={`relative overflow-hidden ${
      mode === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
    }`}>
      {/* 3D Particle Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />
      
      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
              mode === 'dark' ? 
              'bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500' : 
              'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
            }`}>
              WizzText
            </h2>
            <p className={`text-lg ${
              mode === 'dark' ? 'text-purple-200' : 'text-blue-800'
            }`}>
              Revolutionizing text manipulation with cutting-edge 3D technology
            </p>
            <div className="mt-4 flex items-center">
              <FaRocket className={`mr-2 text-xl ${
                mode === 'dark' ? 'text-purple-400' : 'text-blue-500'
              }`} />
              <span className="text-sm">v2.0 Quantum</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
              mode === 'dark' ? 
              'bg-gradient-to-r from-cyan-400 to-blue-600' : 
              'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}>
              Quick Links
            </h2>
            <ul className="space-y-2">
              {['Home', 'About', 'Tools', 'Pricing'].map((item, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    className={`block text-lg ${
                      mode === 'dark' ? 
                      'text-purple-300 hover:text-white' : 
                      'text-blue-700 hover:text-black'
                    } transition-colors duration-200 hover:pl-2`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Links */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h2 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
              mode === 'dark' ? 
              'bg-gradient-to-r from-pink-400 to-red-600' : 
              'bg-gradient-to-r from-cyan-500 to-blue-600'
            }`}>
              Contact Us
            </h2>
            <div className="space-y-3">
              <a 
                href="mailto:contact@wizztext.com" 
                className={`flex items-center text-lg ${
                  mode === 'dark' ? 'text-purple-300 hover:text-white' : 'text-blue-700 hover:text-black'
                } transition-colors duration-200`}
              >
                <FaEnvelope className="mr-3" />
                contact@wizztext.com
              </a>
              <a 
                href="tel:+1234567890" 
                className={`flex items-center text-lg ${
                  mode === 'dark' ? 'text-purple-300 hover:text-white' : 'text-blue-700 hover:text-black'
                } transition-colors duration-200`}
              >
                <FaPhone className="mr-3" />
                +91 8923XXXXXX
              </a>
              <div className={`flex items-start text-lg ${
                mode === 'dark' ? 'text-purple-300' : 'text-blue-700'
              }`}>
                <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0" />
                <span>123 Tech Street, New Delhi, 8080</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Links & Copyright */}
        <div className={`mt-16 pt-8 border-t ${
          mode === 'dark' ? 'border-purple-900/50' : 'border-blue-200/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  mode === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100'
                } shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <FaGithub className={`text-xl ${
                  mode === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  mode === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100'
                } shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <FaLinkedin className={`text-xl ${
                  mode === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  mode === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100'
                } shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <FaTwitter className={`text-xl ${
                  mode === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </a>
            </div>
            <p className={`text-sm ${
              mode === 'dark' ? 'text-purple-300/70' : 'text-blue-600/70'
            }`}>
              © {new Date().getFullYear()} WizzText | Made by Neha Singh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}