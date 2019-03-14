import React, { Component } from 'react';
import history from '../history';
import './index.css'

class MyAccount extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      errorMsg: '',
      createdStories: [],
      memberStories: [],
      bookmarkStories: []      
    }
  }

  async componentWillMount() {
    //get data needed for page current story data
    await this.setState(this.props.state);
    await this.getCreatedStories();
    await this.getMemberStories();
    await this.getBookmarkStories();
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
          ...this.state,
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
          ...this.state,
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
          ...this.state,
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


  render() {
    console.log(this.state, 'MY ACCOUNT STATE')

    // const date = new Date(this.state.currentStory.date)
    // const newdate = date.toLocaleDateString();
    // const details = this.state.currentStory;

    return (

      <h1>working</h1>


    )
  }
}


export default MyAccount;