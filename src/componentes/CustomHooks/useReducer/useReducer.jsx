import { arrayOperations } from '../../../assets/data/arrayOperations/arrayOperations'

export let INITIAL_STATE = {
  currentNumber: '',
  firstCalc: '',
  operation: '',
  secondCalc: '',
  result: '',
  history: []
}

const getCalc = (state, action) =>
  state.operation !== '^'
    ? eval(
        (state.firstCalc || 0) +
          state.operation +
          (action.payload.firstRef || 0)
      )
    : Math.pow(state.firstCalc || 0, action.payload.firstRef || 0)

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'WRITE_VALUE_CLICK':
      return {
        ...state,
        currentNumber: state.currentNumber + action.event.target.textContent
      }
    case 'WRITE_VALUE_KEYBOARD':
      const { key } = action.e

      if (action.toggle && arrayOperations.includes(key)) {
        return {
          ...state,
          currentNumber: '',
          firstCalc: action.firstRef,
          operation: key
        }
      } else if (!isNaN(key) && action.e.code != 'Space') {
        return { ...state, currentNumber: state.currentNumber + key }
      } else if (key === ('Backspace' || 'Delete')) {
        return {
          ...state,
          currentNumber: state.currentNumber.slice(
            0,
            state.currentNumber.length - 1
          )
        }
      } else if (isNaN(key) || action.e.code === 'Space') {
        return { ...state }
      } else {
        return { ...state }
      }

    case 'VALUE_FIRST_CALC':
      return {
        ...state,
        currentNumber: '',
        firstCalc: action.firstRef || 0,
        secondCalc: '',
        operation: action.signal
      }
    case 'END_CALC':
      console.log(state.firstCalc)
      console.log(action.payload.firstRef)
      return {
        ...state,
        secondCalc: action.payload.firstRef,
        currentNumber: '',
        result: getCalc(state, action),
        history: [...state.history, getCalc(state, action)].reverse()
      }
    case 'CLEAR':
      return {
        ...state,
        currentNumber: '',
        firstCalc: '',
        secondCalc: '',
        history: [],
        operation: '',
        result: ''
      }
  }
}
