import React from 'react'
import { useFetch } from './hooks'

interface IJoke {
  id?: number
  type: string
  setup: string
  punchline: string
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
