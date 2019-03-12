import React, { Component } from 'react';
import history from '../history';
import './index.css'

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
    this.setState(this.props.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    return (
      <div className="outer-create">

        <h3>Start a new tale:</h3>
        <div className="inner-create">
          <div className="inner-labels">
            <label>Title:</label>
            <label>Genre: </label>
            <label>Writing Prompt: </label>
          </div>
          <div className="inner-form">
            <form id="create" onSubmit={this.props.handleCreate.bind(null, this.state)}>
              <input 
                type="text" 
                name="title"
                id="createtitle" 
                required
                value={this.state.title} 
                onChange={this.handleChange}
                placeholder="Your store title..."
              />
              <select
                name="genre"
                id="genre"
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
              </select>
              <textarea 
                id="createtext"
                type="text" 
                name="text"
                rows="10" 
                cols="50"
                required
                value={this.state.text}
                onChange={this.handleChange}
                placeholder="Enter your writing prompt here..."
              >
              </textarea>
            </form>
              <button id="createbtn" type="submit" form="create">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}


export default CreateStory;