import React, { useEffect, useState } from 'react'
import { getTime } from '../utils/getTime/getTime'
import './Timer.css'

const Timer = () => {
  const [time, setTime] = useState(getTime)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTime)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div id='timer-container'>
        <span id='day-container'>{time.toLocaleDateString()}</span>
        <span id='time-container'> {time.toLocaleTimeString()}</span>
      </div>
    </>
  )
}

export default Timer
