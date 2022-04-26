import React, { Component } from 'react'
import { postUrls } from '../../apiCalls'

class UrlForm extends Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      title: '',
      urlToShorten: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    postUrls({ title: this.state.title, long_url: this.state.urlToShorten }).then(
      (data) => {
        console.log(data)
        this.props.setUrls((prev) => [...prev, data])
      }
    )
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ title: '', urlToShorten: '' })
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />

        <button id='formSubmit' onClick={(e) => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm
