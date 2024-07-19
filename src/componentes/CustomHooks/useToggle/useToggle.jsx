import { useState } from 'react'

export const useToggle = (initialValue = false) => {
  const [toggle, setToggle] = useState(initialValue)
  const changeToggle = (fixedBoolean = null) => {
    setToggle(fixedBoolean ?? !toggle)
  }

  return [toggle, changeToggle]
}
