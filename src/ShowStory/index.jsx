import React, { Component } from 'react';
import history from '../history';
import './index.css'

class ShowStory extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      text: '',
      errorMsg: '',
      storyQueue: [],
      instantStoryQueue: [],
      contrib: null
    }
  }

  componentWillMount() {
    this.setState(this.props.state)
  }

  componentDidMount() {
    this.checkQueue();
    //makes a queue list for this specific 
    this.genInstantStoryQueue(this.state.storyQueue.storyqueues);
  }

  checkQueue = () => {
    let queue = this.state.storyQueue.storyqueues;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].user_id === this.state.userid && queue[i].story_id === this.state.currentStory.id){
        this.setState({
          ...this.state, 
          contrib: true
        })
      }
    }
  }

  genInstantStoryQueue = (queue) => {
    const newQueue = queue.filter(q => q.story_id === this.state.currentStory.id);
    console.log(newQueue, 'THIS IS NEW QUEUE');
    this.setState({
      ...this.state,
      instantStoryQueue: newQueue
    })
  }

  handleContribute = async () => {
    try {
      //post request to story queues

      const storyQueueRequest = await fetch(`http://localhost:8000/api/v1/storyqueues`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({user_id: this.state.userid, story_id: this.state.currentStory.id}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //throw error if create failed
      if(!storyQueueRequest.ok) {
        throw Error(storyQueueRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await storyQueueRequest.json();
      // if create successful, sort them by status and add to local state
      if (storyQueueRequest.status === 200) {

        const newstoryQueue = this.state.storyQueue.storyqueues;
        newstoryQueue.push(parsedRequest);
        this.setState({...this.state, contrib: true});
        this.addMembership();

      } else {
        this.setState({
          errorMsg: 'Request to server failed.'
        })
      }  
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  addMembership = async () => {
    try {
      //post request to memberships

      const storyQueueRequest = await fetch(`http://localhost:8000/api/v1/memberships`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({user_id: this.state.userid, story_id: this.state.currentStory.id}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //throw error if create failed
      if(!storyQueueRequest.ok) {
        throw Error(storyQueueRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await storyQueueRequest.json();
      // if create successful, sort them by status and add to local state
      if (storyQueueRequest.status === 200) {

        const newMembership = this.state.memberships.memberships;
        newMembership.push(parsedRequest);
        this.setState({...this.state, memberships: newMembership});
        this.genInstantStoryQueue(this.state.storyQueue.storyqueues);

      } else {
        this.setState({
          errorMsg: 'Request to server failed.'
        })
      }  
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(`here is this.state in render in ShowStory()`);
    console.log(this.state);

    const date = new Date(this.state.currentStory.date)
    const newdate = date.toLocaleDateString();
    const details = this.state.currentStory;

    return (

      <div className="outer-container">
        <div className="storybox">
          <div className="container-top">
            <div className="top-left">
              <p>By: {details.username} - Posted: {newdate}</p>
            </div>
            <div className="top-right">
              <p>Genre: {details.genre}</p>
            </div>
          </div>
          <div className="container-bottom">  
            <div className="container-left">
              <div className="titlebox">
                  <p><b>{details.title}</b></p>
              </div>
              <div className="promptbox">
                <p>PROMPT: <b>{details.text}</b></p>
              </div>
            </div>
            <div className="containerright">
              <div className="showcontainer">
                <div className="showbar">
                  <p><b>Status:</b></p>
                  <p>{details.status}</p>
                </div>
                <div className="showbar">
                  {details.status === 'in progress' || details.status === 'content vote'
                    || details.status === 'end vote' || details.status === 'publish vote' ? <p><b>Current Writer:</b></p> : null}
                  {details.status === 'in progress' || details.status === 'content vote'
                    || details.status === 'end vote' || details.status === 'publish vote' ? <p>{details.currentContrib}</p> : null}
                  {details.status === 'completed' ? <p><b>Publish</b></p> : null}

                </div>
                {this.state.userid && this.state.contrib ? 
                  <div 
                    className="showbar" 
                    id="contrib">
                      <p><b>&#x2713; Contributing</b></p>
                  </div> : 
                  <div 
                    className="showbar" 
                    id="nocontrib"
                    onClick={this.handleContribute}>
                      <p><b>Contribute</b></p>
                  </div>
                }
                <div className="showbar">
                  <p><b>Bookmark</b></p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    )
  }
}


export default ShowStory;