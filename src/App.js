
import './App.css';
import Alert from './components/Alert';
// import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import React, { useState } from 'react';

function App() {
  const[mode, setMode]=useState('light');  //whether dark mode is enabled or not
  const [alert,setAlert]=useState(null);
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#05182c';
      showAlert("Dark mode enabled successfully", "success");
    }else{
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert("Light mode enabled successfully", "success");
    }

  }

const showAlert=(message,type)=>{
setAlert({
  msg:message,
  type:type
})
setTimeout(()=>{
    setAlert(null);
  },1500);
}

  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils"/> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert}/>
      <div className="container my-3">
        <Textform showAlert={showAlert} heading="Enter the text to analyse" mode={mode}/>
        {/* <About/> */}
      </div>
    </>
  );
}

export default App;
