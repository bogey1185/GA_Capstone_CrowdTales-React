import React, { Component } from 'react';
import history from '../history';

class ShowStory extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      title: '',
      genre: '',
      text: '',
      errorMsg: ''
    }
  }

  componentWillMount() {
    this.setState(this.props.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state, 'THIS IS Show STATE');
    console.log(this.props, 'THIS IS Show PROPS');
    return (
      <div>
        
      </div>
    )
  }
}


export default ShowStory;