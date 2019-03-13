import React, { Component } from 'react';
import history from '../history';
import './index.css'

const Content = (props) => {

  const date = new Date(props.content.date)
  const newdate = date.toLocaleDateString();

  return (
    <div>
      <div className="contentContainer">
        <div className="contentcontainertop">
          <p>By: {props.content.username} - Posted: {newdate}</p>
        </div>
        <div className="contentcontainerbot">  
          <div className="content-title-box">
              <p><b>{props.content.title}</b></p>
              <br />
          </div>
          <div className="content-text-box">
            <p>{props.content.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Content;