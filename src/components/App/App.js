import React, { useState, useEffect } from 'react'
import './App.css'
import { getUrls } from '../../apiCalls'
import UrlContainer from '../UrlContainer/UrlContainer'
import UrlForm from '../UrlForm/UrlForm'

export const App = () => {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    getUrls().then((data) => {
      const fetched = data.urls
      const mapped = fetched.map((link) => {
        return { ...link, key: Date.now() }
      })
      setUrls(mapped)
    })
  }, [])

  return (
    <main className='App'>
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      <UrlContainer urls={urls} />
    </main>
  )
}

export default App
