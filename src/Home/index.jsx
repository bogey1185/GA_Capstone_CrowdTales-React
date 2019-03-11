import React from 'react';
import history from '../history';
import './index.css'
import IndivStory from './IndivStory';


const Home = (props) => {

  const generateStoryList = (list) => {
    return(
      list.map((story) => {
        return ( 
          <div key={story.id}>
            <IndivStory story={story}/>
          </div>
        )
      })
    )
  };

  const prompts = generateStoryList(props.state.promptStories);
  const progs = generateStoryList(props.state.progressStories);
  const comps = generateStoryList(props.state.completeStories);

  return (
    <div>
      <h3>{props.state.username}'s Homepage</h3>
      <div className="linkbox"><h4 className="link" onClick={props.handleNav.bind(null, '/create', null)}>Go To Create</h4></div>
      <div>
        <h1>New Stories</h1>
          {prompts}
        <h1>Stories in progress</h1>
          {progs}
        <h1>Completed Stories</h1>
          {comps}
      </div>
    </div>
  )

}

  


export default Home;