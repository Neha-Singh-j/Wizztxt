import React from 'react'
import PropTypes from 'prop-types';
export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <a className="navbar-brand" href="/">
    {props.title}
  </a>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/">
          Home <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="nav-item">
          <a className="nav-link" href="/">About</a>
        </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          {props.aboutText}
          {/* props are the components that formed to give property(variables) as per required */}
        </a>
      </li>
      
      
    </ul>
    
<div className={`form-check form-switch text-${props.mode==='light' ? 'dark':'light'}`}>
  <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark mode</label>
</div>
  </div>
</nav>

  );
}
Navbar.propTypes= {title : PropTypes.string,
    aboutText : PropTypes.string
}