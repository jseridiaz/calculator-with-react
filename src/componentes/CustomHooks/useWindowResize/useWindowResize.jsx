import { useEffect, useState } from 'react'

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    widthWindow: innerWidth,
    heightWindow: innerHeight
  })

  const handleResize = () => {
    setWindowSize({ widthWindow: innerWidth, heightWindow: innerHeight })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
