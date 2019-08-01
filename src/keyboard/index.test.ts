import { ViewElement } from '../yoga/types'
import { findElementInTree } from '.'
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
