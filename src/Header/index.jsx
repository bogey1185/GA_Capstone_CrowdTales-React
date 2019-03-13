import React from 'react';
import history from '../history';
import './index.css'

const Header = (props) => {

  return (
    <div className="headerdiv">
      <div id="titleLogo">
        <h1>CrowdTales</h1>        
      </div>
      <div className="navbar">
        <div className="navlink" onClick={props.handleNav.bind(null, '/', null)}>Home</div>
        {props.state.username ? <div className="navlink" onClick={props.handleNav.bind(null, '/create', null)}>Create Story</div> : null}
        {props.state.username ? null : <div className="navlink" onClick={props.handleNav.bind(null, '/login', null)}>Login</div>}
        {props.state.username ? null : <div className="navlink" onClick={props.handleNav.bind(null, '/register', null)}>Register</div>}
        {props.state.username ? <div className="navlink" onClick={props.handleLogout}>Logout</div> : null}
      </div>
    </div>
  )

}

  


export default Header;