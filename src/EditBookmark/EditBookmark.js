import React from 'react'
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types'
import config from '../config'
import './EditBookmark.css'

class EditBookmark extends React.Component {
  
  static contextType = BookmarksContext;
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }

  state = {
    id: '',
    title: '',
    url: '',
    description: '',
    rating: '',
    error: null,
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault() 

    const { title, url, description, rating, id } = this.state
    const updatedBookmark = { 
      id: id,
      title: title,
      url: url,
      description: description,
      rating: rating }
    const requiredFields = [title, url]
    const bookmarkId = this.props.match.params.bookmarkId
    const options = {
      method: 'PATCH',
      body: JSON.stringify(updatedBookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    }

    console.log(JSON.stringify(updatedBookmark))

    for(const field of requiredFields) {
      if(!field) {
        this.setState({
          error: {
            message: `The ${field} field is required`
          }
        })
      }
    }

    fetch(config.API_ENDPOINT + `/${bookmarkId}`, options)
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        } 
      })
      .then(() => {
        this.context.updateBookmark(updatedBookmark)
      })
      .then(() => {
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    const options = {
      method: 'GET',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      }
    }
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, options)
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(data => {
        const { title, url, description, rating, id } = data
        this.setState({ title, url, description, rating, id })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error, title, url, description, rating } = this.state
    return (
      <section className = 'EditBookmark'>
        <h2>Edit Bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div 
            className='EditBookmark__error'
            role='alert'
          >
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={this.handleChange}
              required
            />    
          </div>
          <div>
            <label htmlFor='url'>
              URL
            </label>
            <input
              type='text'
              name='url'
              id='url'
              value={url} 
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={rating}
              min='1'
              max='5'
              onChange={this.handleChange}
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit' onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default EditBookmark