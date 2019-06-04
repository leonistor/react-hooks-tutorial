import React, { useState, ChangeEventHandler } from 'react'
import MATRIX from './data/matrix'
import { useDynamicTransition } from './hooks'

const minDelay = 100

function Matrix() {
  const [delay, setDelay] = useState(minDelay)

  const index = useDynamicTransition({
    delay,
    increment: 1,
    length: MATRIX.length
  })

  const updateDelay: ChangeEventHandler<HTMLInputElement> = event => {
    const delay = Number(event.target.value)
    setDelay(delay)
  }

  return (
    <div className="Matrix">
      <img src={MATRIX[index]} alt="matrix" />
      <div>
        Delay:{' '}
        <input
          type="range"
          min={minDelay}
          max={1000}
          step={50}
          onChange={updateDelay}
          value={delay}
        />{' '}
        {delay}ms
      </div>
    </div>
  )
}

export default Matrix
