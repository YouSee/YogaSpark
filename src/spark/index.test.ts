import { Node } from 'yoga-layout'
import {
  getChildrenMaxLength,
  getObjectDiff,
  translateYogaToSparkLayoutKeys,
  getAnimationWithDefault,
  recursivelyRenderNodes,
} from '.'
import { SparkObjectTypes, SparkScene, SparkObject, SparkTween } from './types'
import { ViewElement } from '../components/types'
import { getObject, getScene } from './index.mock'

const getViewElement = (children: ViewElement[]): ViewElement => ({
  type: SparkObjectTypes.Rect,
  node: Node.create(),
  props: {},
  style: {},
  children,
})

test('Should get the length of the longest array', () => {
  const viewElementWithOneChild: ViewElement = getViewElement(
    Array.from(Array(1), getViewElement),
  )
  const viewElementWithTwoChildren: ViewElement = getViewElement(
    Array.from(Array(2), getViewElement),
  )
  expect(
    getChildrenMaxLength(viewElementWithOneChild, viewElementWithTwoChildren),
  ).toBe(2)
  expect(getChildrenMaxLength(null, viewElementWithOneChild)).toBe(1)
  expect(getChildrenMaxLength(viewElementWithTwoChildren, null)).toBe(2)
})

test('Should return object with keys that doesnt have the same value', () => {
  expect(
    getObjectDiff(
      { left: 0, right: 0, top: 0, bottom: 0, width: 20, height: 20 },
      { left: 0, right: 0, top: 0, bottom: 0, width: 10, height: 10 },
    ),
  ).toEqual({ width: 20, height: 20 })
  expect(
    getObjectDiff(
      { left: 0, right: 0, top: 0, bottom: 0, width: 10, height: 10 },
      { left: 0, right: 0, top: 0, bottom: 0, width: 10, height: 10 },
    ),
  ).toEqual({})
  expect(getObjectDiff({ url: 'url here' }, { text: 'text here' })).toEqual({
    url: 'url here',
  })
})

test('Should return spark keys for yoga layout', () => {
  expect(
    translateYogaToSparkLayoutKeys({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 20,
      height: 20,
    }),
  ).toEqual({ w: 20, h: 20, x: 0, y: 0 })
})

test('Should return animation or default animation if no animation is applied', () => {
  expect(getAnimationWithDefault()).toEqual([0, SparkTween.EASE_IN_BACK])
  expect(
    getAnimationWithDefault({ time: 1, type: SparkTween.EASE_IN_CUBIC }),
  ).toEqual([1, SparkTween.EASE_IN_CUBIC])
})

test('should create element if there is no old node', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element).toBeDefined()
})

test('should not update element if there is an old node and new node has the same style', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  viewElementWithNoChildren.node.setHeight(10)
  viewElementWithNoChildren.node.setWidth(10)
  viewElementWithNoChildren.node.calculateLayout(0, 0, 1)

  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )
  recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
    renderedViewElement,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.element.animateTo).toHaveBeenCalledTimes(0)
})

test('should update element if there is an old node and new node has new style', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  viewElementWithNoChildren.node.setHeight(10)
  viewElementWithNoChildren.node.setWidth(10)
  viewElementWithNoChildren.node.calculateLayout(0, 0, 1)

  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )
  viewElementWithNoChildren.node.setHeight(20)
  viewElementWithNoChildren.node.setWidth(20)
  viewElementWithNoChildren.node.calculateLayout(0, 0, 1)
  recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
    renderedViewElement,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.element.animateTo).toHaveBeenCalledTimes(1)
})

test('should update element if there is an old node and new node has new props', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  viewElementWithNoChildren.props = { text: 'nope' }
  viewElementWithNoChildren.node.setHeight(10)
  viewElementWithNoChildren.node.setWidth(10)
  viewElementWithNoChildren.node.calculateLayout(0, 0, 1)

  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )

  viewElementWithNoChildren.props = { text: 'hej' }
  const updatedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
    renderedViewElement,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.element.animateTo).toHaveBeenCalledTimes(0)
  expect(updatedViewElement.props).toEqual({ text: 'hej' })
})

test('should delete element if there is no new node', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )
  const removedViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    null,
    renderedViewElement,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(1)
  expect(removedViewElement).toBeFalsy()
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.element.remove).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element.removeAll).toHaveBeenCalledTimes(1)
})

test('should delete element and create a new one if new element has different type', () => {
  const viewElementWithNoChildren: ViewElement = getViewElement([])
  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()
  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
  )

  viewElementWithNoChildren.type = SparkObjectTypes.Text
  const reRenderedViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithNoChildren,
    renderedViewElement,
  )
  expect(mockScene.create).toHaveBeenCalledTimes(2)
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.element.remove).toHaveBeenCalledTimes(1)
  expect(renderedViewElement.element.removeAll).toHaveBeenCalledTimes(1)
  expect(reRenderedViewElement.type).toBe(SparkObjectTypes.Text)
})

test('should create element and all children', () => {
  const viewElementWithChildren: ViewElement = getViewElement(
    Array.from(Array(2), () => getViewElement([])),
  )

  const mockScene: SparkScene = getScene()
  const mockObject: SparkObject = getObject()

  const renderedViewElement: ViewElement = recursivelyRenderNodes(
    mockScene,
    mockObject,
    viewElementWithChildren,
  )

  expect(mockScene.create).toHaveBeenCalledTimes(3)
  expect(renderedViewElement.element).toBeDefined()
  expect(renderedViewElement.children.length).toBe(2)
})
