import React from 'react'
import './UrlContainer.css'
import { deleteUrl } from '../../apiCalls'

const UrlContainer = (props) => {
  const handleDelete = (e) => {
    const idToDelete = parseInt(e.target.id)
    props.setUrls((prev) =>
      prev.filter((url) => {
        return url.id !== idToDelete
      })
    )
    deleteUrl(e.target.id).then((res) => {
      if (res.status === 204) {
        props.setErrorMsg('Successfully Deleted URL!')
      }
    })
  }

  const urlEls = props.urls.map((url) => {
    return (
      <div className='url' key={url.id} id={url.id}>
        <h3>{url.title}</h3>
        <a href={url.short_url} target='blank'>
          {url.short_url}
        </a>
        <p>{url.long_url}</p>
        <button onClick={handleDelete} id={url.id}>
          delete
        </button>
      </div>
    )
  })

  return (
    <section>
      {urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p>}
    </section>
  )
}

export default UrlContainer
