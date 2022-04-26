import React, { useState, useEffect } from 'react'
import './App.css'
import { getUrls } from '../../apiCalls'
import UrlContainer from '../UrlContainer/UrlContainer'
import UrlForm from '../UrlForm/UrlForm'

export const App = () => {
  const [urls, setUrls] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getUrls()
      .then((data) => {
        setUrls(data.urls)
      })
      .catch((err) => setErrorMsg(err))
  }, [])

  return (
    <main className='App'>
      <header>
        <h1>URL Shortener</h1>
        <h2>{errorMsg}</h2>
        <UrlForm setUrls={setUrls} setErrorMsg={setErrorMsg} />
      </header>

      <UrlContainer urls={urls} />
    </main>
  )
}

export default App
