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
