import React, { useState, useEffect, ChangeEventHandler } from 'react'
import PICTURES from './data/pictures'

const SECONDS = 1000
const minumDelay = 1 * SECONDS
const minIncrement = 1

function Gallery() {
  const [index, setIndex] = useState(0)
  const [delay, setDelay] = useState(2 * SECONDS)
  const [increment, setIncrement] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(storedIndex => {
        return (storedIndex + increment) % PICTURES.length
      })
    }, delay)

    // cleanup callback for effect
    return () => {
      clearInterval(interval)
    }
  }, [delay, increment])

  const updateDelay: ChangeEventHandler<HTMLInputElement> = event => {
    const delay = Number(event.target.value) * SECONDS
    setDelay(Number(delay < minumDelay ? minumDelay : delay))
  }

  const updateIncrement: ChangeEventHandler<HTMLInputElement> = event => {
    const increment = Number(event.target.value)
    setIncrement(increment < minIncrement ? minIncrement : increment)
  }

  return (
    <div className="Gallery">
      <img src={PICTURES[index].image} alt="gallery" />
      <div className="multiform">
        <div>
          Gallery transition delay (seconds):
          <input type="number" onChange={updateDelay} value={delay / 1000} />
        </div>
        <div>
          Gallery increment step:
          <input type="number" onChange={updateIncrement} value={increment} />
        </div>
      </div>
    </div>
  )
}

export default Gallery
