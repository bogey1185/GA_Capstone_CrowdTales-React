import React from 'react';
import history from '../../history';
import './index.css'


const IndivStory = (props) => {

  return (
    <div>
      <div className="storyContainer">
        <div className="container-left">
          <div className="titlebox">
            <p>{props.story.title}</p>
          </div>
          <div className="promptbox">
            <p>{props.story.text}</p>
          </div>
        </div>
        <div className="container-right">
          <div className="authorbox">
            <p>Created by: {props.story.user_id}</p>
          </div>
          <div className="datebox">
            <p>Created on: {props.story.date}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

  


export default IndivStory;