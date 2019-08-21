import { Node } from 'yoga-layout'
import { Props, ViewElement } from '../components/types'
import { SparkObjectTypes, SparkObject } from '../spark/types'
import { getObject } from '../spark/index.mock'
import {
  getBoundingBoxRight,
  getBoundingBoxLeft,
  getBoundingBoxUp,
  getBoundingBoxDown,
  primaryAxisSelectorNegative,
  primaryAxisSelectorPositive,
  isElementInBox,
  isElementSelectableInBox,
  getPrimaryAxisForDownAndUp,
  getPrimaryAxisForLeftAndRight,
  isElementCloser,
} from './bounding'

export const getViewElement = (
  element: SparkObject,
  props?: Props,
  children?: ViewElement[],
): ViewElement => ({
  type: SparkObjectTypes.Rect,
  node: Node.create(),
  props,
  style: {},
  children: children || [],
  element,
})

test('Should return the bounding box when pressing to the right', () => {
  const sparkObject: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObject)
  expect(getBoundingBoxRight(viewElement)).toEqual([5, 55, 60])
})

test('Should return the bounding box when pressing to the left', () => {
  const sparkObject: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObject)
  expect(getBoundingBoxLeft(viewElement)).toEqual([5, 55, 10])
})

test('Should return the bounding box when pressing up', () => {
  const sparkObject: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObject)
  expect(getBoundingBoxUp(viewElement)).toEqual([10, 60, 5])
})

test('Should return the bounding box when pressing down', () => {
  const sparkObject: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObject)
  expect(getBoundingBoxDown(viewElement)).toEqual([10, 60, 55])
})

test('Should return true if current axis is smaller than active axis', () => {
  expect(primaryAxisSelectorNegative(10, 20)).toBeTruthy()
  expect(primaryAxisSelectorNegative(20, 10)).toBeFalsy()
})

test('Should return true if current axis is larger than active axis', () => {
  expect(primaryAxisSelectorPositive(20, 10)).toBeTruthy()
  expect(primaryAxisSelectorPositive(10, 20)).toBeFalsy()
})

test('Should return true if viewElement is in bounding box for active element', () => {
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  expect(
    isElementInBox(
      viewElement,
      activeElement,
      getBoundingBoxRight,
      primaryAxisSelectorPositive,
    ),
  ).toBeTruthy()
})

test('Should return false if viewElement is not in bounding box for active element', () => {
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  expect(
    isElementInBox(
      viewElement,
      activeElement,
      getBoundingBoxLeft,
      primaryAxisSelectorNegative,
    ),
  ).toBeFalsy()
})

test('Should return isElementInBox function with bounding rect function and axis selector', () => {
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  expect(isElementInBoxInstance).toBeInstanceOf(Function)
  expect(isElementInBoxInstance(viewElement, activeElement)).toBeTruthy()
})

test('Should return primary axis for left and right or up and down', () => {
  const sparkObjectCurrent: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  expect(getPrimaryAxisForDownAndUp(viewElement)).toBe(5)
  expect(getPrimaryAxisForLeftAndRight(viewElement)).toBe(10)
})

test('Should return true if the element is in the bounding box and there is no previous element', () => {
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  expect(
    isElementCloser(
      viewElement,
      activeElement,
      isElementInBoxInstance,
      getPrimaryAxisForLeftAndRight,
      getPrimaryAxisForDownAndUp,
    ),
  ).toBeTruthy()
})

test('Should return true if the element is in the bounding box and its closer than the previous element', () => {
  const sparkObjectPrevious: SparkObject = getObject(120, 5, 50, 50)
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const previousElement: ViewElement = getViewElement(sparkObjectPrevious)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  expect(
    isElementCloser(
      viewElement,
      activeElement,
      isElementInBoxInstance,
      getPrimaryAxisForLeftAndRight,
      getPrimaryAxisForDownAndUp,
      previousElement,
    ),
  ).toBeTruthy()
})

test('Should return true if the element is in the bounding box and its primary axis is equal, but the secondary is closer', () => {
  const sparkObjectPrevious: SparkObject = getObject(120, 15, 50, 50)
  const sparkObjectCurrent: SparkObject = getObject(120, 10, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const previousElement: ViewElement = getViewElement(sparkObjectPrevious)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  expect(
    isElementCloser(
      viewElement,
      activeElement,
      isElementInBoxInstance,
      getPrimaryAxisForLeftAndRight,
      getPrimaryAxisForDownAndUp,
      previousElement,
    ),
  ).toBeTruthy()
})

test('Should return false if the element is in the bounding box and its primary axis is equal, but the secondary is further away', () => {
  const sparkObjectPrevious: SparkObject = getObject(120, 10, 50, 50)
  const sparkObjectCurrent: SparkObject = getObject(120, 15, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const previousElement: ViewElement = getViewElement(sparkObjectPrevious)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  expect(
    isElementCloser(
      viewElement,
      activeElement,
      isElementInBoxInstance,
      getPrimaryAxisForLeftAndRight,
      getPrimaryAxisForDownAndUp,
      previousElement,
    ),
  ).toBeFalsy()
})

test('Should return false if the element is not in the bounding box', () => {
  const sparkObjectCurrent: SparkObject = getObject(120, 60, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent)
  const activeElement: ViewElement = getViewElement(sparkObjectActive)
  const isElementInBoxInstance = isElementSelectableInBox(
    getBoundingBoxRight,
    primaryAxisSelectorPositive,
  )
  expect(
    isElementCloser(
      viewElement,
      activeElement,
      isElementInBoxInstance,
      getPrimaryAxisForLeftAndRight,
      getPrimaryAxisForDownAndUp,
    ),
  ).toBeFalsy()
})
