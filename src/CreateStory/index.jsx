import React, { Component } from 'react';
import history from '../history';

class CreateStory extends Component {
  
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

  componentDidMount() {
    this.setState({
      userid: this.props.state.userid,
      username: this.props.state.username
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state, 'THIS IS CREATE STATE');
    console.log(this.props, 'THIS IS CREATE PROPS');
    return (
      <div>
        <h3>Start a new tale:</h3>
        <form onSubmit={this.props.handleCreate.bind(null, this.state)}>
          <label>Title:</label>
            <input 
              type="text" 
              name="title" 
              required
              value={this.state.title} 
              onChange={this.handleChange}
              placeholder="Your store title..."
            /><br />
          <label>Genre: </label>
            <select
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
              required
            >
              <option value=" "> </option>
              <option value="Action/Adventure">Action/Adventure</option>
              <option value="Children's Literature">Children's Literature</option>
              <option value="Coming-of-Age">Coming-of-Age</option>
              <option value="Crime">Crime</option>
              <option value="Drama">Drama</option>
              <option value="Fairytale">Fairytale</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Satire">Satire</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Short Story">Short Story</option>
              <option value="Suspence">Suspence</option>
              <option value="Thriller">Thriller</option>
              <option value="Young Adult">Young Adult</option>
            </select><br />
          <label>Writing Prompt: </label>
            <textarea 
              type="text" 
              name="text"
              rows="10" 
              cols="50"
              required
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Enter your writing prompt here..."
            >
            </textarea><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default CreateStory;