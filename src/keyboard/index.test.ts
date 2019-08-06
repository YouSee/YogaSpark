import { ViewElement } from '../components/types'
import { KeysMap, Keys } from './types'
import {
  findElementInTree,
  getKeyTemplate,
  mapEventToKey,
  handleArrowKeys,
  handleEnterKey,
} from '.'
import { getObject } from '../spark/index.mock'
import { getViewElement } from './bounding.test'

test('Should walk through the view tree and call selector with tree and previous tree for each iteration', () => {
  const element = getObject(5, 5, 50, 50)
  const viewElementWithTwoChild: ViewElement = getViewElement(
    element,
    {},
    Array.from(Array(2), () => getViewElement(element, {})),
  )
  const mockSelector = jest
    .fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(viewElementWithTwoChild.children[0])
    .mockReturnValueOnce(viewElementWithTwoChild.children[1])

  findElementInTree(viewElementWithTwoChild, mockSelector)
  expect(mockSelector).toHaveBeenCalledTimes(3)
  expect(mockSelector).toHaveBeenNthCalledWith(
    1,
    viewElementWithTwoChild,
    undefined,
  )
  expect(mockSelector).toHaveBeenNthCalledWith(
    2,
    viewElementWithTwoChild.children[0],
    null,
  )
  expect(mockSelector).toHaveBeenNthCalledWith(
    3,
    viewElementWithTwoChild.children[1],
    viewElementWithTwoChild.children[0],
  )
})

test('Should return key template for keyboard input', () => {
  const keysMap: KeysMap = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    ENTER: 4,
  }
  expect(getKeyTemplate(keysMap)).toEqual({
    0: 'LEFT',
    1: 'UP',
    2: 'RIGHT',
    3: 'DOWN',
    4: 'ENTER',
  })
})

test('Sould map event to key enum', () => {
  const keysMap: KeysMap = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    ENTER: 4,
  }
  expect(mapEventToKey(0, keysMap)).toBe('LEFT')
  expect(mapEventToKey(1, keysMap)).toBe('UP')
  expect(mapEventToKey(2, keysMap)).toBe('RIGHT')
  expect(mapEventToKey(3, keysMap)).toBe('DOWN')
  expect(mapEventToKey(4, keysMap)).toBe('ENTER')
})

test('Should call the callback function with the new active element when pressing on arrow keys', () => {
  const mockElementInFocus = jest.fn()

  const parent = getObject(5, 5, 200, 200)
  const firstElement = getObject(5, 5, 50, 50)
  const secondElement = getObject(60, 5, 50, 50)

  const activeKey = 'active'
  const notActiveKey = 'notActive'

  const viewElementWithTwoChild: ViewElement = getViewElement(parent, {}, [
    getViewElement(firstElement, { selectable: true, key: activeKey }),
    getViewElement(secondElement, { selectable: true, key: notActiveKey }),
  ])

  handleArrowKeys(
    Keys.Right,
    mockElementInFocus,
    viewElementWithTwoChild,
    activeKey,
  )

  expect(mockElementInFocus).toHaveBeenCalledTimes(1)
  expect(mockElementInFocus).toHaveBeenNthCalledWith(1, notActiveKey)
})

test('Should call active elements onClick function when pressing enter', () => {
  const mockOnClick = jest.fn()

  const parent = getObject(5, 5, 200, 200)
  const firstElement = getObject(5, 5, 50, 50)

  const activeKey = 'active'

  const viewElementWithTwoChild: ViewElement = getViewElement(parent, {}, [
    getViewElement(firstElement, {
      onClick: mockOnClick,
      selectable: true,
      key: activeKey,
    }),
  ])

  handleEnterKey(viewElementWithTwoChild, activeKey)

  expect(mockOnClick).toHaveBeenCalledTimes(1)
})
