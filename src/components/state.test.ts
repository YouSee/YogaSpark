import { globalState, stateHook } from './state'
import { NodeLayout } from '../yoga/types'

const getNodeLayout = (height: number, width: number): NodeLayout => ({
  height,
  width,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
})

test('globalState should return getState and setState which should return and update the global state', () => {
  const [getState, setState] = globalState()
  setState({ thisisakey: { ...getNodeLayout(15, 15) } })
  setState({ thisisanotherkey: { ...getNodeLayout(10, 10) } })
  expect(getState()).toEqual({
    thisisakey: { ...getNodeLayout(15, 15) },
    thisisanotherkey: { ...getNodeLayout(10, 10) },
  })
})

test('statehook should return getState and setState which should return and update the global state with input key', () => {
  const [getGlobalState, setGlobalState] = globalState()
  const [getState, setState] = stateHook(
    'thisisakey',
    getGlobalState,
    setGlobalState,
  )
  setState(getNodeLayout(20, 20))
  expect(getState()).toEqual(getNodeLayout(20, 20))
})
