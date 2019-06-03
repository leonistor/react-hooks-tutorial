import React, { Fragment } from 'react'
import { useFetch } from './hooks'

interface IStories {
  by: string
  id: number
  title: string
  url: string
  time: number
}

const Stories = () => {
  const stories = useFetch<IStories[]>(
    'https://news-proxy-server.appspot.com/topstories',
    []
  )

  return (
    <Fragment>
      <h3>Stories</h3>
      {stories.length === 0 ? (
        <p>Fetching stories...</p>
      ) : (
        stories.map(story => {
          const { id, url, title, by, time } = story
          const timeStr = new Date(time * 1000)
          return (
            <div key={id}>
              <p>
                <a href={url}>{title}</a> by{' '}
                <em>
                  {by}, {timeStr.toLocaleString()}
                </em>
              </p>
            </div>
          )
        })
      )}
    </Fragment>
  )
}

export default Stories
