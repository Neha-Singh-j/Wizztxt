import "./App.css";
import Alert from "./components/Alert";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarkdownEditor from './components/MarkdownEditor';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = mode === 'dark' ? '#05182c' : 'white';
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    showAlert(`${newMode === 'dark' ? 'Dark' : 'Light'} mode enabled`, "success");
  };

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <Router>
      <div className={`flex flex-col min-h-screen transition-colors duration-300 ${mode === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
        <Navbar 
          title="WizzText" 
          mode={mode} 
          toggleMode={toggleMode} 
          showAlert={showAlert}
        />
        
        <Alert alert={alert} />
        
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              <Textform
                showAlert={showAlert}
                heading="Enter the text to analyse"
                mode={mode}
              />
            } />
            
            <Route path="/about" element={
              <About mode={mode} />
            } />
            
            <Route path="/markdown" element={
              <MarkdownEditor 
                mode={mode} 
                showAlert={showAlert}
              />
            } />
          </Routes>
        </main>

        <Footer mode={mode} />
      </div>
    </Router>
  );
}

export default App;