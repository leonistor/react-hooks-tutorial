import React, { useState, ChangeEventHandler } from 'react'
import PICTURES from './data/pictures'
import { useDynamicTransition } from './hooks'

const SECONDS = 1000
const minumDelay = 1 * SECONDS
const minIncrement = 1

function Gallery() {
  const [delay, setDelay] = useState(2 * SECONDS)
  const [increment, setIncrement] = useState(1)

  const index = useDynamicTransition({
    delay,
    increment,
    length: PICTURES.length
  })

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
