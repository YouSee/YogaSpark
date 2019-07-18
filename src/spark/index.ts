import { SparkScene, SparkObject, SparkStretch, SparkTween } from './types'
import { Props } from '../components'
import { ViewElement, NodeLayout } from '../yoga'
import { Style } from '../yoga/types'

export const getChildrenMaxLength = (
  newNode?: ViewElement,
  oldNode?: ViewElement,
): number =>
  Math.max(
    newNode ? newNode.children.length : 0,
    oldNode ? oldNode.children.length : 0,
  )

export const getObjectDiff = (
  newObject: { [key: string]: any },
  oldObject: { [key: string]: any },
) =>
  Object.keys(newObject).reduce(
    (accumulator, key) =>
      key in oldObject && newObject[key] === oldObject[key]
        ? accumulator
        : { [key]: newObject[key], ...accumulator },
    {},
  )

export const translateYogaToSparkLayoutKeys = (layout: {
  [key: string]: any
}) => {
  const keysToTranslate: { [key: string]: string } = {
    top: 'y',
    left: 'x',
    width: 'w',
    height: 'h',
  }
  return Object.keys(layout).reduce(
    (accumulator, key) =>
      key in keysToTranslate
        ? { [keysToTranslate[key]]: layout[key], ...accumulator }
        : accumulator,
    {},
  )
}

export const createElement = (
  scene: SparkScene,
  parent: SparkObject,
  nodeObject: ViewElement,
): ViewElement => {
  let { type, props, node, element } = nodeObject

  const nodeLayout = node.getComputedLayout()

  element = scene.create({
    t: type,
    ...props,
    parent,
    ...translateYogaToSparkLayoutKeys(nodeLayout),
    stretchX: SparkStretch.STRETCH,
    stretchY: SparkStretch.STRETCH,
  })

  return { ...nodeObject, nodeLayout, element }
}

export const updateElement = (newNode: ViewElement, oldNode: ViewElement) => {
  let { node, element } = newNode

  const newNodeLayout = node.getComputedLayout()

  const styleDiff: Style = getObjectDiff(newNodeLayout, oldNode.nodeLayout)
  const propsDiff: Props = getObjectDiff(newNode.props, oldNode.props)

  if (Object.keys(styleDiff).length > 0) {
    element.animateTo(
      { ...translateYogaToSparkLayoutKeys(styleDiff) },
      1,
      SparkTween.EASE_OUT_ELASTIC,
    )
  }

  const propsDiffKeys: Array<string> = Object.keys(propsDiff)
  if (propsDiffKeys.length > 0) {
    propsDiffKeys.forEach(key => (element[key] = propsDiff[key]))
  }

  return { ...newNode, nodeLayout: newNodeLayout }
}

export const destroyElement = (nodeObject: ViewElement) => {
  let { element } = nodeObject
  element.removeAll()
  element.remove()
}

export const recursivelyRenderNodes = (
  scene: SparkScene,
  parent: SparkObject,
  newNode: ViewElement,
  oldNode?: ViewElement,
): ViewElement => {
  let newParent: ViewElement
  if (!oldNode) newParent = createElement(scene, parent, newNode)
  if (oldNode && newNode) {
    newParent = updateElement(
      {
        ...newNode,
        element: oldNode.element,
      },
      oldNode,
    )
  }
  if (oldNode && oldNode.element && !newNode) {
    destroyElement(oldNode)
    return null
  }
  return {
    ...newParent,
    children: [...Array(getChildrenMaxLength(newNode, oldNode))].map(
      (_: any, idx: number) =>
        recursivelyRenderNodes(
          scene,
          newParent ? newParent.element : null,
          newNode && newNode.children[idx],
          oldNode && oldNode.children[idx],
        ),
    ),
  }
}
