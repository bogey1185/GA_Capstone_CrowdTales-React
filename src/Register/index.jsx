import React, { Component } from 'react';
import history from '../history';

class RegisterUser extends Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '', 
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
      <div>
        <h3>Please sign up:</h3>
        <form onSubmit={this.props.handleRegister.bind(null, this.state)}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br />
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/> <br />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/> <br />
          <label>Verify Password:</label>
          <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange}/> <br />
          <button type="submit">Submit</button>
        </form>
        {this.state.errorMsg ? <h1>{this.state.errorMsg}</h1> : null}
      </div>
    )
  }
}


export default RegisterUser;