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
      errorMsg: '',
    }
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
      this.setState({
        errorMsg: err
      })
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
      this.setState({
        errorMsg: err
      })
      return(err);
    }
  }

    //------------------------------//
    //                              //  
    //    Handle Create             //
    //                              //
    //------------------------------//

  handleCreate = async (args, e) => {
    e.preventDefault();
    try {
      console.log(args);
      console.log('HITTING CREATE');
      
    } catch (err) {
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
    // history.push. This gives me access to app state when redirecting. 
    // I also added an optional 2nd arg that allows me to change app state 
    // before I redirect!
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
