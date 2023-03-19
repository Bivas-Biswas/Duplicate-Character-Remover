import { useEffect } from 'react'

const useKeyPress = (listener: (_event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [listener])
}

export default useKeyPress
