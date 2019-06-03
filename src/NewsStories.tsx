import React, { useEffect, useState, Fragment } from 'react'

interface INewsStories {
  by: string
  id: number
  title: string
  url: string
  time: number
}

const NewsStories = () => {
  const [stories, setStories] = useState<INewsStories[]>([])

  useEffect(() => {
    fetch('https://news-proxy-server.appspot.com/topstories')
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        setStories(json)
      })
  }, [])

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

export default NewsStories
