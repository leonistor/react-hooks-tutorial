import React, {
  useState,
  KeyboardEventHandler,
  ChangeEventHandler
} from 'react'
import './Joke'
import Joke from './Joke'
import Stories from './Stories'
import Tasks from './Tasks'
import Gallery from './Gallery'
import Matrix from './Matrix'

function App(): JSX.Element {
  const [userQuery, setUserQuery] = useState<string>('')
  const [showGallery, setShowGallery] = useState(true)

  const updateUserQuery: ChangeEventHandler<HTMLInputElement> = event => {
    // console.log(userQuery)
    setUserQuery(event.currentTarget.value)
    console.log(userQuery)
  }

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank')
  }

  const handleKeyPress: KeyboardEventHandler = event => {
    if (event.key === 'Enter') {
      searchQuery()
    }
  }

  const toggleShowGallery = () => {
    setShowGallery(!showGallery)
  }

  return (
    <div className="App">
      <h1>Hello, Nutzi!</h1>
      <div className="form">
        <input
          value={userQuery}
          onChange={updateUserQuery}
          onKeyPress={e => handleKeyPress(e)}
        />
        <button onClick={searchQuery}>Search</button>
        {/* {userQuery} */}
      </div>
      <hr />
      {/* <Joke /> */}
      <hr />
      <Tasks />
      <hr />
      <div>
        {showGallery ? <Gallery /> : null}
        <button onClick={toggleShowGallery}>
          {showGallery ? 'Hide' : 'Show'} Gallery
        </button>
      </div>
      <hr />
      <Matrix />
      <hr />
      {/* <Stories /> */}
    </div>
  )
}

export default App
