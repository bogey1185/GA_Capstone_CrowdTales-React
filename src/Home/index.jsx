import React, { Component } from 'react';
import history from '../history';
import './index.css'

class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      errorMsg: ''
    }
  }

  componentWillMount() {
    this.setState(this.props.state)
  }


  render() {
    console.log(this.state, 'THIS IS HOME STATE');
    console.log(this.props, 'THIS IS HOME PROPS');
    return (
      <div>
        <h3>{this.state.username}'s Homepage</h3>
        <div className="linkbox"><h4 className="link" onClick={this.props.handleNav.bind(null, '/create', null)}>Go To Create</h4></div>
      </div>
    )
  }
}


export default Home;