import React, { Component } from 'react';
import history from '../history';
import './index.css'

class ShowStory extends Component {
  
  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
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

    const date = new Date(this.state.currentStory.date)
    const newdate = date.toLocaleDateString();
    const details = this.state.currentStory;

    return (

      <div className="outer-container">
        <div className="storybox">
          <div className="container-top">
            <div className="top-left">
              <p>By: {details.username} - Posted: {newdate}</p>
            </div>
            <div className="top-right">
              <p>Genre: {details.genre}</p>
            </div>
          </div>
          <div className="container-bottom">  
            <div className="container-left">
              <div className="titlebox">
                  <p><b>{details.title}</b></p>
              </div>
              <div className="promptbox">
                <p>PROMPT: <b>{details.text}</b></p>
              </div>
            </div>
            <div className="containerright">
              <div className="showcontainer">
                <div className="showbar">
                  <p><b>Status:</b></p>
                  <p>{details.status}</p>
                </div>
                <div className="showbar">
                  {details.status === 'in progress' || details.status === 'content vote'
                    || details.status === 'end vote' || details.status === 'publish vote' ? <p><b>Current Writer:</b></p> : null}
                  {details.status === 'in progress' || details.status === 'content vote'
                    || details.status === 'end vote' || details.status === 'publish vote' ? <p>{details.currentContrib}</p> : null}
                  {details.status === 'completed' ? <p><b>Publish</b></p> : null}

                </div>
                <div className="showbar">
                  <p><b>Contribute</b></p>
                </div>
                <div className="showbar">
                  <p><b>Bookmark</b></p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    )
  }
}


export default ShowStory;