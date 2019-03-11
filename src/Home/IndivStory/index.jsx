import React from 'react';
import history from '../../history';
import './index.css'


const IndivStory = (props) => {

  console.log(props.story, 'INDIVSTORY PROPS');

  const date = new Date(props.story.date)
  const newdate = date.toLocaleDateString();

  return (
    <div>
      <div className="storyContainer">
        <div className="container-top">
          <p>By: {props.story.username} - Posted: {newdate}</p>
        </div>
        <div className="container-bottom" onClick={props.handleNav.bind(null, '/story', {currentStory: props.story})}>  
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