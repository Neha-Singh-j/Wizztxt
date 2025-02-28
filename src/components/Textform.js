import React, { useState } from "react";

export default function Textform(props) {
  const [text, setText] = useState(""); // Default empty text

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to UpperCase", "success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to LowerCase", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared", "success");
  };

  const handleExtraSpaces = () => {
    setText(text.replace(/\s+/g, " ").trim());
    props.showAlert("Extra spaces removed", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // Correct word counting, including Enter and spaces
  const wordsArray = text.trim().split(/\s+|\n+/).filter((word) => word.length > 0);
  const wordCount = wordsArray.length;
  const charCount = text.length;
  const readingTime = (0.008 * wordCount).toFixed(2); // Rounded to 2 decimal places

  return (
    <>
      <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="mybox"
            rows={8}
            placeholder="Enter your text here" // Set placeholder instead of default value
          />
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to UpperCase</button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to LowerCase</button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove ExtraSpaces</button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
      </div>

      <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "black" }}>
        <h1>Text Summary</h1>
        <p>{wordCount} words and {charCount} characters</p>
        <p>{readingTime} minutes required to read the given text</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Enter something to preview it here"}</p>
      </div>
      
    </>
  );
}
