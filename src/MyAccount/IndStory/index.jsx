import React from 'react';
import history from '../../history';
import './index.css'


const IndStory = (props) => {

  const date = new Date(props.story.date)
  const newdate = date.toLocaleDateString();

  return (
    <div className="outerIndStory">
      <div className="indStoryContainer" onClick={props.story.story_id ? props.handleNav.bind(null, '/story', {currentStoryNum: props.story.story_id}) : props.handleNav.bind(null, '/story', {currentStoryNum: props.story.id})}>
        <div className="indcontainertop">
          <p>By: {props.story.username} - Posted: {newdate}</p>
          <p>Status: {props.story.status === 'completed' ? <span id="storyStatusComp">{props.story.status}</span> : <span>{props.story.status}</span>}</p>
        </div>
        <div className="containerbot">  
          <div className="title-box">
              <p>{props.story.title}</p>
          </div>
          <div id="myacctprompt" className="prompt-box">
            <p>{props.story.text}</p>
          </div>
        </div>
      </div>
      <div className="button" onClick={props.publishStory.bind(null, props.story.id)}>
        {props.story.story_id ? null : <div className="publish">Publish</div>}
      </div>
    </div>
  )

}

  


export default IndStory;