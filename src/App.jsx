import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Create from './CreateStory';
import history from './history';

const My404 = () => {
  return (
    <div>
      Error 404: Page Not Found
    </div>
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      userid: '',
      username: '', 
      userStories: [],
      promptStories: [],
      progressStories: [],
      completeStories: [],
      errorMsg: '',
    }
  }

  componentDidMount() {
    this.getStories();
  }

    //------------------------------//
    //                              //  
    //    Handle Register           //
    //                              //
    //------------------------------//

  handleRegister = async (args, e) => {
    e.preventDefault();
    try {
      // create user object
      const newUser = {
        username: args.username,
        email: args.email,
        password: args.password,
        password2: args.password2
      }
      const createUserRequest = await fetch(`http://localhost:8000/api/v1/users`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //throw error if create failed
      if(!createUserRequest.ok) {
        throw Error(createUserRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedCreateRequest = await createUserRequest.json();
      // if create successful, return to login page
      if (createUserRequest.status === 201) {
        //add user id and username to state for further use
        this.setState({
          userid: parsedCreateRequest.id,
          username: parsedCreateRequest.username
        })
        //redirect to homepage
        history.push('/');
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

    //------------------------------//
    //                              //  
    //    Handle Login              //
    //                              //
    //------------------------------//

  handleLogin = async (args, e) => {
    e.preventDefault();
    try {
      // create user object
      const user = {
        username: args.username,
        password: args.password
      }
      const createUserRequest = await fetch(`http://localhost:8000/api/v1/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //throw error if create failed
      if(!createUserRequest.ok) {
        throw Error(createUserRequest.statusText)
      }
      //recieve response from server and parse from json
      const parsedCreateRequest = await createUserRequest.json();
      // if create successful, return to login page
      if (createUserRequest.status === 201) {
        //add user id and username to state for further use
        this.setState({
          userid: parsedCreateRequest.id,
          username: parsedCreateRequest.username
        })
        //redirect to homepage
        history.push('/');
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

    //------------------------------//
    //                              //  
    //    Handle Create Story       //
    //                              //
    //------------------------------//

  handleCreate = async (args, e) => {
    e.preventDefault();
    try {
      // create object for creation query
      const newStory = {
        user_id: args.userid,
        title: args.title,
        genre: args.genre, 
        text: args.text
      }
      const createStoryRequest = await fetch(`http://localhost:8000/api/v1/stories`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newStory),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //throw error if create failed
      if(!createStoryRequest.ok) {
        throw Error(createStoryRequest.statusText)
      }

      //recieve response from server and parse from json
      const parsedCreateRequest = await createStoryRequest.json();

      // if create successful, return to home page
      if (createStoryRequest.status === 200) {
        //add returned story object to state in addition to whatever was there
        const newStoryList = [...this.state.userStories, parsedCreateRequest];

        this.setState({
          ...this.state,
          userStories: newStoryList,
          promptStories: [...this.state.promptStories, parsedCreateRequest]
        })
        //redirect to homepage
        history.push('/');
      } else {
        //if create unsuccessful, notify
        this.setState({
          errorMsg: 'Create story failed. Try again.'
        })
      }  
      
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

    //------------------------------//
    //                              //  
    //    Get all stories           //
    //                              //
    //------------------------------//

    // grab all stories in componentDidMount and add to state for use on website

  getStories = async () => {
    try {
      //get all stories
      const storyRequest = await fetch(`http://localhost:8000/api/v1/stories`);
      //throw error if create failed
      if(!storyRequest.ok) {
        throw Error(storyRequest.statusText)
      }
      console.log(storyRequest, 'THIS IS STORY REQUEST');
      //recieve response from server and parse from json
      const parsedStoryRequest = await storyRequest.json();

      console.log(parsedStoryRequest, 'THIS IS parsedSTORY REQUEST');
      // if create successful, sort them by status and add to local state
      if (storyRequest.status === 200) {

        let promptStories = [];
        let progressStories = [];
        let completeStories = [];

        parsedStoryRequest.stories.forEach(story => {
          if (story.status === 'in prompt') {
            promptStories.push(story)
          } else if (story.status === 'in progress') {
            progressStories.push(story) 
          } else {
            completeStories.push(story)
          }

        })

        this.setState({
          ...this.state,
          promptStories: promptStories,
          progressStories: progressStories,
          completeStories: completeStories
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
    //    Handle Nav                //
    //                              //
    //------------------------------//

    // with handlenav, I can create a faux link on any page,
    // call it with an onclick event, and then redirect to any page using 
    // history.push. This also gives me access to app state when redirecting. 
    // Further with optional 2nd arg I can change app state before I redirect!
  handleNav = (arg1, arg2) => {
    if (arg2) {
      this.setState(arg2)
    }
    history.push(`${arg1}`)
  }

  //--------------------------------------------//
  //RENDER
  //--------------------------------------------//

  render() {
    console.log(this.props, 'THIS IS PROPS');
    console.log(this.state, 'THIS IS STATE');
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home state={this.state} handleNav={this.handleNav}/>} />
            <Route exact path="/register" render={() => <Register handleRegister={this.handleRegister}/>} />
            <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin}/>} />
            <Route exact path="/create" render={() => <Create state={this.state} handleCreate={this.handleCreate}/>} />
            <Route component={ My404 } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
