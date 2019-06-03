import React, { useEffect, useState } from 'react'

interface IJoke {
  id?: number
  type: string
  setup: string
  punchline: string
}

function useFetch<T>(url: RequestInfo, initialValue: T): T {
  const [result, setResult] = useState(initialValue)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setResult(json))
  }, [])

  return result
}

const Joke = () => {
  const initJoke = {
    id: undefined,
    type: 'empty',
    setup: 'fetching',
    punchline: '...'
  }

  const { setup, punchline } = useFetch(
    'https://official-joke-api.appspot.com/random_joke',
    initJoke
  )

  return (
    <div>
      <h3>Joke of the session:</h3>
      <p>{setup}</p>
      <p>
        <em>{punchline}</em>
      </p>
    </div>
  )
}

export default Joke
