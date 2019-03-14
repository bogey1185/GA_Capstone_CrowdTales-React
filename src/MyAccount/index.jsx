import React, { Component } from 'react';
import history from '../history';
import './index.css'
import IndStory from './IndStory';

class MyAccount extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      errorMsg: '',
      createdStories: [],
      memberStories: [],
      bookmarkStories: [],
      isLoaded: false      
    }
  }

  componentWillMount() {
    this.setState(this.props.state);
  }

  async componentDidMount() {
    await this.setState(this.props.state);
    await this.getCreatedStories();
    await this.getMemberStories();
    await this.getBookmarkStories();
    this.setState({isLoaded: true})
  }

  getCreatedStories = async () => {
    try {
      // get all stories created by user
      const storiesRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/userstories/${this.state.userid}`);
      //throw error if create failed
      if(!storiesRequest.ok) {
        throw Error(storiesRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedStoriesRequest = await storiesRequest.json();
      // if create successful, return to login page
      if (storiesRequest.status === 200) {
        //add user id and username to state for further use
        this.setState({
          // ...this.state,
          createdStories: parsedStoriesRequest
        })

      } else {
        //if create unsuccessful because username taken, update
        //state with error message so it can render!
        this.setState({
          errorMsg: 'Username taken. Please try again.'
        })
      }  
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  getMemberStories = async () => {
    try {
      // get all stories created by user
      const storiesRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/membershipstory/${this.state.userid}`);
      //throw error if create failed
      if(!storiesRequest.ok) {
        throw Error(storiesRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedStoriesRequest = await storiesRequest.json();
      // if create successful, return to login page
      if (storiesRequest.status === 200) {
        //add user id and username to state for further use
        this.setState({
          // ...this.state,
          memberStories: parsedStoriesRequest
        })

      } else {
        //if create unsuccessful because username taken, update
        //state with error message so it can render!
        this.setState({
          errorMsg: 'Username taken. Please try again.'
        })
      }  
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  getBookmarkStories = async () => {
    try {
      // get all stories created by user
      const storiesRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/bookmarkstory/${this.state.userid}`);
      //throw error if create failed
      if(!storiesRequest.ok) {
        throw Error(storiesRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedStoriesRequest = await storiesRequest.json();
      // if create successful, return to login page
      if (storiesRequest.status === 200) {
        //add user id and username to state for further use
        this.setState({
          // ...this.state,
          bookmarkStories: parsedStoriesRequest
        })

      } else {
        //if create unsuccessful because username taken, update
        //state with error message so it can render!
        this.setState({
          errorMsg: 'Username taken. Please try again.'
        })
      }  
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  publishStory = async (id) => {
    try {
      const getStory = await fetch(`${process.env.REACT_APP_PATH}/api/v1/stories/${id}`);
      
      const parsedStory = await getStory.json();

      const updatedStory = {
          ...parsedStory,
          status: 'completed'
        }

      // //update the story per the above object
      const updateRequest = await fetch(`${process.env.REACT_APP_PATH}/api/v1/stories/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(updatedStory),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedUpdateRequest = await updateRequest.json();

      console.log(parsedUpdateRequest, 'PARSE U');

      // if create successful, return to login page
      if (updateRequest.status === 200) {
        console.log(this.state.createdStories, 'CREATED STOREIS');
        const newCreatedStories = this.state.createdStories.stories.map(story => {
          if (story.id === parsedUpdateRequest.id) {
            return parsedUpdateRequest
          } else {
            return story
          }
        })

        this.setState({
          ...this.state,
          createdStories: {stories: newCreatedStories}, 
          isLoaded: false
        })
        this.resetLoaded();
        this.props.handleNav(null, 'reset');

      } else {
        //if create unsuccessful because username taken, update
        //state with error message so it can render!
        this.setState({
          errorMsg: 'Username taken. Please try again.'
        })
      } 
      
          
    } catch (err) {
      console.log(err);
      return(err);
    
    }


  }

  resetLoaded = () => {
    this.setState({
      isLoaded: true
    })
  }

  renderContent = () => {
    const generateStoryList = (list) => {
      return(
        list.map((story) => {
          return ( 
            <div key={story.id}>
              <IndStory story={story} handleNav={this.props.handleNav} publishStory={this.publishStory}/>
            </div>
          )
        })
      )
    };

    const creates = generateStoryList(this.state.createdStories.stories);
    const members = generateStoryList(this.state.memberStories.memberships);
    const marks = generateStoryList(this.state.bookmarkStories.bookmarks);
    
    return (
      <div className="outerMyAcct">
        <div className="myaccountlist">
          <h1>Created Stories</h1>
            {creates}
          <h1>Memberships</h1>
            {members}
          <h1>Bookmarks</h1>
            {marks}
        </div>
      </div>
    )
  }


  render() {

    return (
      <div>
        {this.state.isLoaded ? this.renderContent() : null}
      </div>   
    )
  }
}


export default MyAccount;