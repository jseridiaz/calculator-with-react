import { useCallback, useContext, useReducer, useRef } from 'react'
import './Calculator.css'
import BtnCalc from '../BtnCalc/BtnCalc'
import Btn from '../Btn/Btn'
import { useToggle } from '../CustomHooks/useToggle/useToggle'
import Input from '../Input/Input'
import { arrayOperations } from '../../assets/data/arrayOperations/arrayOperations'
import { INITIAL_STATE, reducer } from '../CustomHooks/useReducer/useReducer'
import { SizeContext, themeContext } from '../../App'

const Calculator = () => {
  const currentSizing = useContext(SizeContext)
  const firstRef = useRef()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { currentNumber, firstCalc, secondCalc, operation, result, history } =
    state
  const [toggle, setToggle] = useToggle(true)
  const { theme, setTheme } = useContext(themeContext)

  const setDispatch = useCallback(
    (operation) => {
      dispatch({
        type: 'END_CALC',
        payload: { firstRef: parseInt(firstRef.current.value) }
      })
      setToggle()
    },
    [operation]
  )
  const setDispatchFirstValue = useCallback((e) => {
    dispatch({
      type: 'VALUE_FIRST_CALC',
      signal: e,
      firstRef: parseInt(firstRef.current.value)
    })
    setToggle()
  }, [])
  const setClearDispatch = useCallback(() => {
    dispatch({ type: 'CLEAR' })
    setToggle(true)
  }, [])

  return (
    <>
      <h1>React Calculator</h1>
      <h2 id='current-result'>Result: {result}</h2>
      <div
        className={
          firstCalc && theme == 'dark'
            ? 'absolute border'
            : firstCalc && theme == 'light'
            ? 'absolute border-light'
            : 'absolute'
        }
        id='current-calc'
      >
        {firstCalc && (
          <div>
            {firstCalc.toString().length < 6
              ? firstCalc
              : '...' + firstCalc.toString().slice(-7)}
          </div>
        )}
        {operation && <div>{operation}</div>}
        {secondCalc && (
          <div>
            {secondCalc.toString().length < 6
              ? secondCalc
              : '...' + secondCalc.toString().slice(-6)}
          </div>
        )}
      </div>

      <form
        className='flex-container-column'
        id='calculator-container'
        onSubmit={(e) => {
          e.preventDefault()
          !toggle && setDispatch(operation)
        }}
        onKeyDown={(e) => {
          if (arrayOperations.includes(e.key)) {
            setDispatchFirstValue(e.key)
          } else {
            dispatch({
              type: 'WRITE_VALUE_KEYBOARD',
              e,
              firstRef: parseInt(firstRef.current.value),
              toggle
            })
          }
        }}
      >
        <Input
          statValue={currentNumber}
          className={`input-calc ${theme}-mode`}
          reference={firstRef}
        />
        <div id='btn-container-controller' className='flex-container'>
          <div className='flex-container set-layout-numbers'>
            <BtnCalc
              arrayType={{ length: 10 }}
              action={(e) => {
                dispatch({ type: 'WRITE_VALUE_CLICK', event: e })
              }}
            />
          </div>
          <div
            className={
              currentSizing.widthWindow > 954
                ? 'flex-container-column operation-container'
                : 'flex-container operation-container'
            }
          >
            <BtnCalc
              arrayType={arrayOperations}
              action={(e) => {
                if (toggle) {
                  setDispatchFirstValue(e.target.textContent)
                }
              }}
            />
          </div>
        </div>
        <div className='flex-container' id='calculator-btn-container'>
          <Btn
            id='reset-btn'
            text='Clear'
            typeBtn='button'
            action={() => {
              setClearDispatch()
            }}
          />
          <Btn id='calc-btn' text='=' typeBtn='submit' />
        </div>
      </form>
      <div id='history-result-container' className='flex-container'>
        {history &&
          history.map((e, index) => (
            <div key={'calc-' + e + '-' + index}>{e}</div>
          ))}
      </div>
    </>
  )
}

export default Calculator
