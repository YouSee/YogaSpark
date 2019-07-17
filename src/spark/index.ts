import { SparkScene, SparkObject, SparkStretch, SparkTween } from './types'
import { ViewElement, NodeLayout } from '../yoga'

export const createElement = (
  scene: SparkScene,
  parent: SparkObject,
  nodeObject: ViewElement,
): ViewElement => {
  let { type, props, node, element } = nodeObject

  const nodeLayout = node.getComputedLayout()

  const { left, top, width, height } = nodeLayout
  element = scene.create({
    t: type,
    ...props,
    parent,
    y: top,
    x: left,
    w: width,
    h: height,
    stretchX: SparkStretch.STRETCH,
    stretchY: SparkStretch.STRETCH,
  })

  return { ...nodeObject, nodeLayout, element }
}

export const updateElement = (nodeObject: ViewElement) => {
  let { node, element } = nodeObject

  const nodeLayout = node.getComputedLayout()
  const { left, top, width, height } = nodeLayout

  element.animateTo(
    { y: top, x: left, w: width, h: height },
    1,
    SparkTween.EASE_OUT_ELASTIC,
  )

  return { ...nodeObject, nodeLayout }
}

export const destroyElement = (nodeObject: ViewElement) => {
  let { element } = nodeObject
  element.removeAll()
  element.remove()
}

export const getChildrenMaxLength = (
  newNode: ViewElement,
  oldNode: ViewElement,
) =>
  Math.max(
    newNode ? newNode.children.length : 0,
    oldNode ? oldNode.children.length : 0,
  )

export const recursivelyRenderNodes = (
  scene: SparkScene,
  parent: SparkObject,
  newNode: ViewElement,
  oldNode: ViewElement,
): ViewElement => {
  let newParent: ViewElement
  if (!oldNode) newParent = createElement(scene, parent, newNode)
  if (oldNode && newNode) {
    newParent = updateElement({
      ...newNode,
      element: oldNode.element,
    })
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
