import React, { memo, useMemo } from 'react'
import './BtnCalc.css'

const BtnCalc = memo(({ arrayType, action }) => {
  console.log('me renderizo')
  let array
  useMemo(() => {
    array = Array.from(arrayType, (v, i) => v ?? i).map((el, index) => (
      <button
        type='button'
        onClick={action}
        key={index}
        id={`operation-${el}-${index}`}
      >
        {el}
      </button>
    ))
  }, [action])
  return <>{array}</>
})

export default BtnCalc
