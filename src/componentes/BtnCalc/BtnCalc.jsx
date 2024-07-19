import React, { memo } from 'react'
import './BtnCalc.css'

const BtnCalc = memo(({ arrayType, action }) => {
  console.log('me renderizo')
  return (
    <>
      {Array.from(arrayType, (v, i) => v ?? i).map((el, index) => (
        <button type='button' onClick={action} id={`operation-${el}-${index}`}>
          {el}
        </button>
      ))}
    </>
  )
})

export default BtnCalc
