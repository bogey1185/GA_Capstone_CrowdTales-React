import React from 'react';
import history from '../../history';
import './index.css'


const IndivStory = (props) => {

  return (
    <div>
      <div className="storyContainer">
        <div className="container-top">
          <p>By: {props.story.user_id} - {props.story.date}</p>
        </div>
        <div className="container-bottom">  
          <div className="titlebox">
              <p>{props.story.title}</p>
          </div>
          <div className="promptbox">
            <p>{props.story.text}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

  


export default IndivStory;