import React, { Component } from 'react';
import history from '../history';
import './index.css'
import Content from '../Content';

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
      contrib: null, 
      createtext: '',
      currentContent: [],
      contentTitle: ''
    }
  }

  componentWillMount() {
    this.setState(this.props.state)
  }

  componentDidMount() {
    this.checkQueue();
    //makes a queue list for this specific story 
    this.manageInstantStoryQueue(this.state.storyQueue.storyqueues);
    this.getCurrentStoryContent();
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

  manageInstantStoryQueue = async (queue) => {
    const newQueue = queue.filter(q => q.story_id === this.state.currentStory.id);
    for (let i = 0; i < newQueue.length; i++) {
      if (newQueue[i].user_id === this.state.userid && this.state.contrib !== true) {
        this.setState({
          ...this.state,
          instantStoryQueue: newQueue,
          contrib: true
        })
      } else {
        this.setState({
          ...this.state,
          instantStoryQueue: newQueue
        })
      }
    } 
    //if there are people in the queue, and no one is assigned to be current contrib
    if (this.state.instantStoryQueue.length > 0 && this.state.currentStory.currentContrib === '') {
      //update story table to reflect current contrib and delete index 0 queue
      try {
        //get username of next contributor
        const getUserRequest = await fetch(`http://localhost:8000/api/v1/users/${this.state.instantStoryQueue[0].user_id}`)
        const parsedRequest = await getUserRequest.json();
        const contribUsername = parsedRequest.username;
        // update object
        const updatedStory = {
          ...this.state.currentStory,
          currentContrib: contribUsername,
          status: 'in progress',
          username: this.state.currentStory.username
        }
        //update the story per the above object
        const updateRequest = await fetch(`http://localhost:8000/api/v1/stories/${this.state.currentStory.id}`, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(updatedStory),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        //throw error if create failed
        if(!updateRequest.ok) {
          throw Error(updateRequest.statusText)
        }
        //recieve response from server and parse from json
        const parsedUpdateRequest = await updateRequest.json();
        //quickly get rid of the status queue entry that is used up
        const deleteRequest = await fetch(`http://localhost:8000/api/v1/storyqueues/${this.state.instantStoryQueue[0].id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'}
        })

        if(!deleteRequest.ok) {
          throw Error(updateRequest.statusText)
        }
        //if udpate and delete requests were successful
        if (updateRequest.status === 200 && deleteRequest.status === 200) {

          const newInstantQueue = this.state.instantStoryQueue;
          //remove first element of instant queue
          newInstantQueue.shift();
          //update state with new story changes and instant queue
          this.setState({
            ...this.state,
            instantStoryQueue: newInstantQueue,
            currentStory: parsedUpdateRequest
          })
          this.props.getStories();
          this.props.getStoryQueues();
          

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
          this.manageInstantStoryQueue(this.state.storyQueue.storyqueues);

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

  handleContentSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state, 'THIS IS CONTENT SUBMIT this.STATE');

    // object to submit
    const newContent = {
      user_id: this.state.userid,
      username: this.state.username,
      title: this.state.contentTitle,
      text: this.state.createtext,
      story_id: this.state.currentStory.id,
    }

    const newContentRequest = await fetch(`http://localhost:8000/api/v1/content`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newContent),
        headers: {
          'Content-Type': 'application/json'
        }
    })

    if(!newContentRequest.ok) {
        throw Error(newContentRequest.statusText)
    }

    const parsedContentRequest = await newContentRequest.json();
    console.log(parsedContentRequest, 'THIS IS THE NEW CONTENT');
    // update state with new content
    this.setState({
      ...this.state, 
      currentContent: [...this.state.currentContent, parsedContentRequest]
    })
    // update content in state
    this.props.getContent();
    // //update current story content so it can show on page
    // this.getCurrentStoryContent();

  }

  getCurrentStoryContent = () => {
    console.log('updating current story content');
    const currentStoryContent = this.state.allContent.content.filter(content => content.story_id === this.state.currentStory.id);
    console.log('this is currentstorycontent');
    this.setState({
      ...this.state,
      currentContent: currentStoryContent
    })
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

    const contentList = this.state.currentContent.map((content, i) => <Content key={i} content={content} />);

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
        { this.state.username !== '' && this.state.username === this.state.currentStory.currentContrib ? 
          <div className="createcontent">
            <h3>Create New Content:</h3>
            <form onSubmit={this.handleContentSubmit}>
              <label>Chapter Title: </label>
              <input id="contentTitle" type="text" name="contentTitle" value={this.state.contentTitle} onChange={this.handleChange}/><br />
              <textarea name="createtext" value={this.state.createtext} onChange={this.handleChange}></textarea><br />
              <button type="submit">Submit</button>
            </form>
          </div>
          : null
        }
        { contentList }

      </div>  
    )
  }
}


export default ShowStory;