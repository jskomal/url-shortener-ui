export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls').then((response) => response.json())
}

export const postUrls = (message) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
