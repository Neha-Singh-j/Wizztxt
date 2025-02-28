import React, { useState } from "react";

export default function About({ darkMode }) {  // Taking darkMode as a prop from main App
    const [mystyle, setMyStyle] = useState({
        color: 'black',
        backgroundColor: 'white'
    });

    const [btntext, setbtntext] = useState("Enable Dark Mode");

    const toggleStyle = () => {
        if (mystyle.color === 'black') {
            setMyStyle({
                color: 'white',
                backgroundColor: 'black'
            });
            setbtntext("Enable Light Mode");
        } else {
            setMyStyle({
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid black'
            });
            setbtntext("Enable Dark Mode");
        }
    };

    return (
        <>
            {/* About Section */}
            <div className="container" style={mystyle}>
                <h2 className="my-2">About us</h2>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed w-100" style={mystyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Features of WizzText
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body" style={mystyle}>
    

    WizzText offers a range of powerful and easy-to-use text manipulation features designed to enhance your productivity. With just a few clicks, you can convert text to uppercase or lowercase, remove extra spaces, and instantly count words and characters. Our smart word counter even recognizes line breaks, ensuring accurate text analysis. Additionally, WizzText provides an estimated reading time to help you gauge how long it takes to read your content. Whether you're editing documents, writing code, or refining text for better readability, WizzText makes text processing effortless and efficient. 🚀
          </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed w-100" style={mystyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                About Us
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body" style={mystyle}>
        <p>
     

Welcome to <strong>WizzText</strong>, your ultimate text manipulation tool! We believe that working with text should be simple, efficient, and hassle-free. Whether you're a student, writer, developer, or just someone looking to modify text quickly, WizzText has got you covered.  

Our powerful yet easy-to-use features allow you to:  
✔ Convert text to <strong>uppercase </strong> or <strong>lowercase </strong> 
✔ <strong>Remove extra spaces</strong> effortlessly  
✔  <strong>Count words and characters in real-time  </strong>
✔  <strong>Estimate reading time accurately  </strong>

At WizzText, our mission is to provide a fast, reliable, and user-friendly text editing experience. We’re constantly improving and adding new features to make text processing smoother for you.  

Try WizzText today and simplify your text manipulation tasks in just a few clicks! 🚀
</p></div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed w-100" style={mystyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Pricing
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={mystyle}>
          <strong>WizzText Pricing Plans</strong>  
          <p>We offer flexible pricing plans to suit your needs:</p>
          <ul>
            <li><strong>Free Plan:</strong> Basic text tools - $0/month</li>
            <li><strong>Pro Plan:</strong> Advanced text features - $5/month</li>
            <li><strong>Enterprise Plan:</strong> API access & support - $15/month</li>
          </ul>
          <p>Choose the plan that best fits your needs and enhance your text manipulation experience with WizzText!</p>
        </div>
                        </div>
                    </div>
                </div>

                <div className="container my-3">
                    <button onClick={toggleStyle} type="button" className="btn btn-primary">{btntext}</button>
                </div>
            </div>

            {/* Footer - Separate from About Section */}
            <footer className={`footer py-5 mt-4 ${darkMode ? "footer-dark" : "footer-dark"}`}>
            <div className="container">

                    <div className="row">
                        <div className="col-md-4">
                            <h5>WizzText</h5>
                            <p>
                                Designed and built with all the care in the world by the WizzText team.
                                <br />
                                Code licensed MIT.
                            </p>
                            <p>Currently v1.0.0</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li>Home</li>
                                <li>Docs</li>
                                <li>Examples</li>
                                <li>Icons</li>
                                <li>Themes</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5>Guides</h5>
                            <ul className="list-unstyled">
                                <li>Getting Started</li>
                                <li>Starter Template</li>
                                <li>Webpack</li>
                                <li>Parcel</li>
                                <li>Vite</li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5>Projects</h5>
                            <ul className="list-unstyled">
                                <li>WizzText 5</li>
                                <li>WizzText 4</li>
                                <li>Icons</li>
                                <li>RFS</li>
                                <li>Examples Repo</li>
                            </ul>
                        </div>
                        {/* <div className="col-md-2">
                            <h5>Community</h5>
                            <ul className="list-unstyled">
                                <li>Issues</li>
                                <li>Discussions</li>
                                <li>Corporate Sponsors</li>
                                <li>Open Collective</li>
                                <li>Stack Overflow</li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="text-center mt-4">
                        <p>© 2025 WizzText. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
