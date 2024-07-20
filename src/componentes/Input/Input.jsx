import { memo } from 'react'
import './Input.css'

const Input = ({ statValue, reference, className }) => {
  return (
    <input
      type='number'
      className={className}
      ref={reference}
      value={statValue}
    />
  )
}

export default memo(Input)
