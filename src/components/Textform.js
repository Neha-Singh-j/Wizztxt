import React, { useState } from "react";
export default function Textform(props) {
  const handleUpClick = () => {
    console.log("uppercase was clicked");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase","success");
  };
  const handleloClick = () => {
    console.log("uppercase was clicked");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase","success");
  };
  
  const handleclearClick = () => {
    console.log("cleartext was clicked");
    let newText = '';
    setText(newText);
    props.showAlert("Text get cleared","success");
  };
  const handleExtraSpaces=() =>{
    let newText=text.split(/[ ]+/);
    setText(newText.join(" "))
    props.showAlert("Extra spaces removed","success");
  }
  const handleOnChange = (event) => {
    console.log("on change");
    setText(event.target.value);
  };
  const [text, setText] = useState("Enter text here");
  // setText("new text"); used for changing text
  return (
    <>
    <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
    <h1>{props.heading}</h1>
      <div className="mb-3">
        <label htmlFor="mybox"></label>
        <textarea
  className="form-control"
  value={text}
  onChange={handleOnChange}
  
  id="mybox"
  rows={8}
/>

      </div>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>
        Convert to UpperCase
      </button>
      <button className="btn btn-primary mx-2" onClick={handleloClick}>
        Convert to LowerCase
      </button>
      
      
      <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>
        Remove ExtraSpaces
      </button>
      <button className="btn btn-primary mx-2" onClick={handleclearClick}>
        Clear Text
      </button>
    </div>
  <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
<h1>Here your text summary</h1>
<p>{text.split(" ").length} word and {text.length }characters</p>
<p>{0.008 * text.split(" ").length} Time required to read the given text</p>
<h3>Preview</h3>
<p>{text.length>0?text:"Enter Something to preview it here"}</p>
  </div>
    </>
  );
}
