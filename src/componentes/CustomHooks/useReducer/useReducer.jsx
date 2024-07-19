import { arrayOperations } from '../../../assets/data/arrayOperations/arrayOperations'

export let INITIAL_STATE = {
  currentNumber: '',
  firstCalc: '',
  operation: '',
  secondCalc: '',
  result: '',
  history: []
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'WRITE_VALUE_CLICK':
      console.log(action.event.target.textContent)
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
        firstCalc: action.firstRef,
        secondCalc: '',
        operation: action.signal
      }

    case '+':
      console.log(state.firstCalc, action.firstRef)
      return (
        !action.toggle && {
          ...state,
          currentNumber: '',
          secondCalc: action.firstRef || 0,
          result: (state.firstCalc || 0) + (action.firstRef || 0),
          history: [
            ...state.history,
            (state.firstCalc || 0) + (action.firstRef || 0)
          ].reverse()
        }
      )
    case '-':
      return (
        !action.toggle && {
          ...state,
          currentNumber: '',
          secondCalc: action.firstRef || 0,
          result: (state.firstCalc || 0) - (action.firstRef || 0),
          history: [
            ...state.history,
            (state.firstCalc || 0) - (action.firstRef || 0)
          ].reverse()
        }
      )
    case '*':
      return {
        ...state,
        currentNumber: '',
        secondCalc: action.firstRef || 0,
        result: (state.firstCalc || 0) * (action.firstRef || 0),
        history: [
          ...state.history,
          (state.firstCalc || 0) * (action.firstRef || 0)
        ].reverse()
      }
    case '/':
      return {
        ...state,
        secondCalc: action.firstRef || 0,
        currentNumber: '',
        result: (state.firstCalc || 0) / (action.firstRef || 0),
        history: [
          ...state.history,
          (state.firstCalc || 0) / (action.firstRef || 0)
        ].reverse()
      }
    case '%':
      return {
        ...state,
        currentNumber: '',
        secondCalc: action.firstRef || 0,
        result: (state.firstCalc || 0) % (action.firstRef || 0),
        history: [
          ...state.history,
          (state.firstCalc || 0) % (action.firstRef || 0)
        ].reverse()
      }
    case '^':
      return {
        ...state,
        currentNumber: '',
        secondCalc: action.firstRef || 0,
        result: Math.pow(state.firstCalc || 0, action.firstRef || 0),
        history: [
          ...state.history,
          Math.pow(state.firstCalc || 0, action.firstRef || 0)
        ].reverse()
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
