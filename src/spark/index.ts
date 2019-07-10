import { SparkScene, SparkObject, SparkStretch, SparkTween } from './types'
import { ViewElement } from '../yoga'

export const renderElement = (
  scene: SparkScene,
  parent: SparkObject,
  nodeObject: ViewElement,
): ViewElement => {
  let { type, props, node, element } = nodeObject

  const { left, top, width, height } = node.getComputedLayout()

  if (!element) {
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
  } else {
    element.animateTo({ y: element.y - 210 }, 1, SparkTween.EASE_OUT_ELASTIC)
  }

  return { ...nodeObject, element }
}

export const recursivelyRenderNodes = (
  scene: SparkScene,
  parent: SparkObject,
  newNode: ViewElement,
  oldNode: ViewElement,
): ViewElement => {
  let newParent: ViewElement
  if (!oldNode) newParent = renderElement(scene, parent, newNode)
  if (oldNode && newNode)
    newParent = renderElement(scene, parent, {
      ...newNode,
      element: oldNode.element,
    })
  return {
    ...newParent,
    children: newNode.children.map((child, idx) =>
      recursivelyRenderNodes(
        scene,
        newParent.element,
        child,
        oldNode && oldNode.children[idx],
      ),
    ),
  }
}
