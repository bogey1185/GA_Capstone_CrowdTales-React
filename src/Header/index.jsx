import React from 'react';
import history from '../history';
import './index.css'

const Header = (props) => {

  return (
    <div className="headerdiv">
      <div className="navlink">Create Story</div>
      <div className="navlink">Login</div>
      <div className="navlink">Register</div>
    </div>
  )

}

  


export default Header;