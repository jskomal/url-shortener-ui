import React, { Component } from 'react'
import { postUrls } from '../../apiCalls'

class UrlForm extends Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      title: '',
      urlToShorten: '',
      statusMsg: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateInputs()) {
      postUrls({ title: this.state.title, long_url: this.state.urlToShorten })
        .then((res) => {
          if (!res.ok) {
            this.props.setErrorMsg(res)
          } else {
            return res
          }
        })
        .then((data) => {
          this.props.setUrls((prev) => [...prev, data])
          this.setState({ statusMsg: '' })
        })
    } else {
      this.setState({
        statusMsg: 'You may not submit without values for both the title and the URL'
      })
    }
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ title: '', urlToShorten: '' })
  }

  validateInputs = () => {
    return this.state.title && this.state.urlToShorten ? true : false
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
        <p id='statusMsg'>{this.state.statusMsg}</p>
      </form>
    )
  }
}

export default UrlForm
