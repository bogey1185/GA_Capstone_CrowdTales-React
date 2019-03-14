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

  renderContent = () => {
    const generateStoryList = (list) => {
      return(
        list.map((story) => {
          return ( 
            <div key={story.id}>
              <IndStory story={story} handleNav={this.props.handleNav}/>
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