import React, { useEffect, useState } from 'react'

interface IJoke {
  id?: number
  type: string
  setup: string
  punchline: string
}

const Joke = () => {
  const [joke, setJoke] = useState<IJoke>({
    id: undefined,
    type: 'empty',
    setup: 'fetching',
    punchline: '...'
  })

  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        setJoke(json)
      })
  }, [])

  const { setup, punchline } = joke

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
