import { useEffect, useState } from 'react'

export function useFetch<T>(url: RequestInfo, initialValue: T): T {
  const [result, setResult] = useState(initialValue)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setResult(json))
  }, [])

  return result
}

interface IDynamicTransition {
  increment: number
  delay: number
  length: number
}

export const useDynamicTransition = (args: IDynamicTransition) => {
  let { increment, delay, length } = args
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(storedIndex => {
        return (storedIndex + increment) % length
      })
    }, delay)

    // cleanup callback for effect
    return () => clearInterval(interval)
  }, [delay, increment])

  return index
}
