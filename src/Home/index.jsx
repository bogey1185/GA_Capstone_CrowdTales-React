import React, { Component } from 'react';
import history from '../history';
import './index.css'


const Home = (props) => {

  console.log(props, 'THIS IS PROPs');

  const prompts = props.state.promptStories.map((story) => {
    
    return ( 
      <li key={story.id}>
        <ul>
          <li>{story.user_id}</li>
          <li>{story.title}</li>
          <li>{story.text}</li>
        </ul>
      </li>
    )
  })

  const progs = props.state.progressStories.map((story) => {
    
    return (
      <li key={story.id}>
        <ul>
          <li>{story.user_id}</li>
          <li>{story.title}</li>
          <li>{story.text}</li>
        </ul>
      </li>
    )
  })

  const comps = props.state.completeStories.map((story) => {
      
    return (
      <li key={story.id}>
        <ul>
          <li>{story.user_id}</li>
          <li>{story.title}</li>
          <li>{story.text}</li>
        </ul>
      </li>
    )
  })

  return (
    <div>
      <h3>{props.state.username}'s Homepage</h3>
      <div className="linkbox"><h4 className="link" onClick={props.handleNav.bind(null, '/create', null)}>Go To Create</h4></div>
      <div>
        <h1>New Stories</h1>
        <ul>
          {prompts}
        </ul>
        <h1>Stories in progress</h1>
        <ul>
          {progs}
        </ul>
        <h1>Completed Stories</h1>
        <ul>
          {comps}
        </ul>
      </div>
    </div>
  )

}

  


export default Home;