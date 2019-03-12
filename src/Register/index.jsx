import React, { Component } from 'react';
import history from '../history';
import './index.css'

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
      <div className="outerdiv">
        <div className="register-div">
          <div className="titlediv">
            <h3>Please sign up:</h3>
          </div>
          <div className="fieldsdiv">
            <div className="labeldiv">
              <label>Username:</label>
              <label>Email:</label>
              <label>Password:</label>
              <label>Verify Password:</label>
            </div><br />
            <div className="inputdiv">
              <form className="registerform" onSubmit={this.props.handleRegister.bind(null, this.state)}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> 
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/> 
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/> 
                <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange}/> 
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          {this.state.errorMsg ? <h1>{this.state.errorMsg}</h1> : null}
        </div>
      </div>
    )
  }
}


export default RegisterUser;