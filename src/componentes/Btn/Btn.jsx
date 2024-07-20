import { memo } from 'react'

const Btn = memo(({ typeBtn, text, idName, action }) => {
  console.log('me renderizo')
  return (
    <button type={typeBtn} id={idName} onClick={action}>
      {text}
    </button>
  )
})

export default Btn
