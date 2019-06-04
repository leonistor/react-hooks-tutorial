import React, { useState, useEffect, ChangeEventHandler } from 'react'
import MATRIX from './data/matrix'

const minDelay = 100

function Matrix() {
  const [index, setIndex] = useState(0)
  const [delay, setDelay] = useState(minDelay)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(storedIndex => {
        return (storedIndex + 1) % MATRIX.length
      })
    }, delay)

    return () => clearInterval(interval)
  }, [delay])

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
