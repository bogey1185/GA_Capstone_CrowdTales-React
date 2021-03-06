import React from 'react';
import history from '../../history';
import './index.css'


const IndivStory = (props) => {

  const date = new Date(props.story.date)
  const newdate = date.toLocaleDateString();

  return (
    <div>
      <div className="storyContainer" onClick={props.handleNav.bind(null, '/story', {currentStoryNum: props.story.id})}>
        <div className="containertop">
          <p>By: {props.story.username} - Posted: {newdate}</p>
        </div>
        <div className="containerbot">  
          <div className="title-box">
              <p>{props.story.title}</p>
          </div>
          <div className="prompt-box">
            <p>{props.story.text}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

  


export default IndivStory;