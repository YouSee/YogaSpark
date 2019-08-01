import { State } from './types'
import { NodeLayout } from '../yoga/types'

export const globalState = (): [() => State, (state: State) => void] => {
  let state: State = {}
  const setState = (newState: State): void => {
    state = { ...state, ...newState }
  }
  const getState = () => state
  return [getState, setState]
}

export const stateHook = (
  key: string,
  getGlobalState: () => State,
  setGlobalState: (state: State) => void,
): [() => NodeLayout, (state: NodeLayout) => void] => {
  const getState = (): NodeLayout => getGlobalState()[key]
  const setState = (newState: NodeLayout): void => {
    setGlobalState({ [key]: { ...getState(), ...newState } })
  }
  // TODO should probably delete the element when unmounting
  return [getState, setState]
}
