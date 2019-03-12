import React, { Component } from 'react';
import history from '../history';
import './index.css'

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
    return (
      <div className="outer-div">
        <div className="login-div">
          <div className="title-div">
            <h3>Please sign in:</h3>
          </div>
          <div className="auths-div">
            <form className="loginform" onSubmit={this.props.handleLogin.bind(null, this.state)}>
              <div className="label-div">
                <label>Username:</label>
                <label>Password:</label>
              </div><br />
              <div className="input-div">
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/> <br />
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          {this.state.errorMsg ? <h1>{this.state.errorMsg}</h1> : null}
        </div>
      </div>
    )
  }
}


export default LoginUser;