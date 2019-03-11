import React from 'react';
import history from '../history';
import './index.css'

const Header = (props) => {

  return (
    <div className="headerdiv">
      <div>
        <h1>CrowdTales</h1>        
      </div>
      <div className="navbar">
        <div className="navlink" onClick={props.handleNav.bind(null, '/', null)}>Home</div>
        <div className="navlink" onClick={props.handleNav.bind(null, '/create', null)}>Create Story</div>
        <div className="navlink" onClick={props.handleNav.bind(null, '/login', null)}>Login</div>
        <div className="navlink" onClick={props.handleNav.bind(null, '/register', null)}>Register</div>
      </div>
    </div>
  )

}

  


export default Header;