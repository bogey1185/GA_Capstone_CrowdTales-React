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
      marked: null,
      createtext: '',
      currentContent: [],
      contentTitle: '',
      currentStory: [], 
      allContent: [],
      bookmarks: []
    }
  }

  componentWillMount() {
    console.log('WILL MOUNT');
    //get current story data
    this.getCurrentStory();
    this.setState(this.props.state);
  }

  async componentDidMount() {
    await this.getStoryQueues();
    await this.getContent();
    await this.getMemberships();
    await this.getBookmarks();
    await this.getCurrentStoryContent();
    await this.checkQueue();
    this.manageInstantStoryQueue();
    this.manageBookmarks();

  }

    //------------------------------//
    //                              //  
    //    Get all story queues      //
    //                              //
    //------------------------------//

  getCurrentStory = async () => {
    // get story queue. if user is in it, disable queue button
    try {
      //get all people queued
      const request = await fetch(`${process.env.REACT_APP_PATH}/api/v1/stories/${this.props.state.currentStoryNum}`);
      //throw error if create failed
      if(!request.ok) {
        throw Error(request.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await request.json();
      // if create successful, sort them by status and add to local state
      if (request.status === 200) {
        this.setState({
          ...this.state,
          currentStory: parsedRequest
        })
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

    //------------------------------//
    //                              //  
    //    Get all story queues      //
    //                              //
    //------------------------------//

  getStoryQueues = async () => {
    // get story queue. if user is in it, disable queue button
    try {
      //get all people queued
      const request = await fetch(`${process.env.REACT_APP_PATH}/api/v1/storyqueues`);
      //throw error if create failed
      if(!request.ok) {
        throw Error(request.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await request.json();
      // if create successful, sort them by status and add to local state
      if (request.status === 200) {
        this.setState({
          ...this.state,
          storyQueue: parsedRequest
        })

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

    //------------------------------//
    //                              //  
    //    manage bookmarks          //
    //                              //
    //------------------------------//

  getBookmarks = async () => {
    // get bookmarks. if user is in it, disable queue button
    try {
      //get all people queued
      const request = await fetch(`${process.env.REACT_APP_PATH}/api/v1/bookmarks`);
      //throw error if create failed
      if(!request.ok) {
        throw Error(request.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await request.json();
      // if create successful, sort them by status and add to local state
      if (request.status === 200) {
        this.setState({
          ...this.state,
          bookmarks: parsedRequest
        })

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

  manageBookmarks = () => {
    const bookmarks = this.state.bookmarks.bookmarks;
    let markStatus = null;
    //loop through bookmarks -- if any 
    bookmarks.forEach(mark => {
      //if any bookmark as the current user's id and the current story's id, it is bookmarked. so change mark status to true
      if (mark.user_id === this.state.userid && mark.story_id === this.state.currentStory.id) {
        markStatus = true;
      } 
    })
    this.setState({
      ...this.state,
      marked: markStatus
    })
  }

  handleBookmark = async () => {

    try {

    //query DB to create a bookmark
      const request = await fetch(`${process.env.REACT_APP_PATH}/api/v1/bookmarks`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({user_id: this.state.userid, story_id: this.state.currentStory.id}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      //throw error if create failed
      if(!request.ok) {
        throw Error(request.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await request.json();
      // if create successful, just toggle marked status to true
      if (request.status === 200) {
        this.setState({
          ...this.state,
          marked: true
        })

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


    //update bookmark list

    //rerun managebookmark 
  


    //------------------------------//
    //                              //  
    //    Queue management          //
    //                              //
    //------------------------------//

  checkQueue = () => {
    let queue = this.state.storyQueue.storyqueues;
    if (queue.length > 0) {
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].user_id === this.state.userid && queue[i].story_id === this.state.currentStory.id){
          this.setState({
            ...this.state, 
            contrib: true
          })
        }
      }  
    }
  }

  manageInstantStoryQueue = async () => {
    let queue = this.state.storyQueue.storyqueues;
    const newQueue = queue.filter(q => q.story_id === this.state.currentStory.id);

    //should current user be shown as in contrib queue?
    let contribStatus = null;
    for (let i = 0; i < newQueue.length; i++) {
      //if we find user in the newQueue, then make status true
      if (newQueue[i].user_id === this.state.userid) {
        contribStatus = true;
      }
    }
    // set state with the newqueue and the contrib status
    this.setState({
      instantStoryQueue: newQueue,
      contrib: contribStatus
    })
    // if there are people in the queue, and no one is assigned to be current contrib
    if (this.state.instantStoryQueue.length > 0 && (this.state.currentStory.currentContrib === '' || this.state.currentStory.currentContrib === 'None')) {
      //update story table to reflect current contrib and delete index 0 queue
      try {
        //get username of next contributor
        const getUserRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/users/${this.state.instantStoryQueue[0].user_id}`)
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
        const updateRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/stories/${this.state.currentStory.id}`, {
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
        const deleteRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/storyqueues/${this.state.instantStoryQueue[0].id}`, {
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

    //------------------------------//
    //                              //  
    //    handleContribute          //
    //                              //
    //------------------------------//

  handleContribute = async () => {

    try {
      //post request to story queues

      const storyQueueRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/storyqueues`, {
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

        const newQueue = this.state.storyQueue;
        newQueue.storyqueues = newstoryQueue;

        this.setState({
          ...this.state, 
          contrib: true,
          storyQueue: newQueue
        });
        this.manageInstantStoryQueue(newQueue.storyqueues);
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

    //------------------------------//
    //                              //  
    //    membership management     //
    //                              //
    //------------------------------//

  getMemberships = async () => {
    // get story queue. if user is in it, disable queue button
    try {
      //get all memberships
      const request = await fetch(`${process.env.REACT_APP_PATH}/api/v1/memberships`);
      //throw error if create failed
      if(!request.ok) {
        throw Error(request.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await request.json();
      // if create successful, sort them by status and add to local state
      if (request.status === 200) {
        this.setState({
          ...this.state,
          memberships: parsedRequest
        })

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

      const storyQueueRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/memberships`, {
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

    //------------------------------//
    //                              //  
    //    Get all content.          //
    //                              //
    //------------------------------//

  getContent = async () => {
    // get all content
    try {
      const requestContent = await fetch(`${process.env.REACT_APP_PATH}/api/v1/content`);
      //throw error if create failed
      if(!requestContent.ok) {
        throw Error(requestContent.statusText)
      }
      //recieve response from server and parse from json
      const parsedRequest = await requestContent.json();
      // if create successful, sort them by status and add to local state
      if (requestContent.status === 200) {
        this.setState({
          // ...this.state,
          allContent: parsedRequest
        })

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

    // object to submit
    const newContent = {
      user_id: this.state.userid,
      username: this.state.username,
      title: this.state.contentTitle,
      text: this.state.createtext,
      story_id: this.state.currentStory.id,
    }

    const newContentRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/content`, {
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
    //prepare to update state.
    //first figure out if there is another person in the queue to contribute.
    //if there isnt, next writer remains ''
    let nextWriter = 'None';
    //if there is someone in the queue
    if (this.state.instantStoryQueue.length > 0) {
      //query to get the person's username
      const usernameRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/users/${this.state.instantStoryQueue[0].user_id}`);
      //parse request
      const parsedUsernameRequest = await usernameRequest.json();
      //assign username to nextWriter
      nextWriter = parsedUsernameRequest.username;
    }

    //make model object to inject nextwriter into upcoming state update
    const newCurrentStory = {
      ...this.state.currentStory,
      currentContrib: nextWriter
    }

    //use model to update the current story object
    const updateRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/stories/${this.state.currentStory.id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(newCurrentStory),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let newInstantQueue = this.state.instantStoryQueue;
    //if there was another person in the queue, and the name of next writer is saved, query the DB to remove the person from the queue
    if (this.state.instantStoryQueue.length > 0) {
      const deleteRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/storyqueues/${this.state.instantStoryQueue[0].id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      //remove the next writer from the instant story queue as well
      newInstantQueue.shift();
    }

    //replace story is story list with newCurrentStory too
    let newProgressStories = this.state.progressStories.map(story => {
      if (story.id === newCurrentStory.id) {
        return newCurrentStory
      } else {
        return story
      }
    })


    // update state with new content. also, change to next writer
    this.setState({
      ...this.state, 
      currentContent: [...this.state.currentContent, parsedContentRequest],
      currentStory: newCurrentStory,
      instantStoryQueue: newInstantQueue,
      progressStories: newProgressStories,
      contentTitle: '',
      createtext: '',
      contrib: null
    })
    // update content 
    this.getContent();
    //reset our storyqueues as well
    this.getStoryQueues();
  }

  getCurrentStoryContent = () => {
    const currentStoryContent = this.state.allContent.content.filter(content => content.story_id === this.state.currentStory.id);
    this.setState({
      currentContent: currentStoryContent
    })
  } 

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state, 'SHOW STATE')
    console.log(this.props, "SHOW PROPS")

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
                    id={this.state.currentStory.status === 'completed' ? 'completed' : "nocontrib"}
                    onClick={this.state.currentStory.status === 'completed' ? null : this.handleContribute}>
                      <p><b>Contribute</b></p>
                  </div>
                }
                {this.state.userid && this.state.marked ? 
                  <div 
                    className="showbar" 
                    id="marked">
                      <p><b>&#x2713; Bookmarked</b></p>
                  </div> : 
                  <div 
                    className="showbar" 
                    id="notmarked"
                    onClick={this.handleBookmark}>
                      <p><b>Bookmark</b></p>
                  </div>
                }
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