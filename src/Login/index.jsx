import React, { Component } from 'react';
import history from '../history';

class LoginUser extends Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state, 'THIS IS LOGIN STATE');
    console.log(this.props, 'THIS IS LOGIN PROPS');
    return (
      <div>
        <h3>Please sign in:</h3>
        <form onSubmit={this.props.handleLogin.bind(null, this.state)}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/> <br />
          <button type="submit">Submit</button>
        </form>
        {this.state.errorMsg ? <h1>{this.state.errorMsg}</h1> : null}
      </div>
    )
  }
}


export default LoginUser;