import { createStore } from 'redux'

const counter = (state: number = 0, action): number => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export const store = createStore(counter)
