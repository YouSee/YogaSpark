import { SparkScene, SparkObject, SparkStretch, SparkTween } from './types'
import { Props, ViewElement } from '../components/types'
import { Style, NodeLayout } from '../yoga/types'

export const getChildrenMaxLength = (
  newNode?: ViewElement,
  oldNode?: ViewElement,
): number =>
  Math.max(
    newNode ? newNode.children.length : 0,
    oldNode ? oldNode.children.length : 0,
  )

export const getObjectDiff = (
  newObject: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
  oldObject: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
) =>
  Object.keys(newObject).reduce(
    (accumulator, key) =>
      key in oldObject && newObject[key] === oldObject[key]
        ? accumulator
        : { [key]: newObject[key], ...accumulator },
    {},
  )

export const translateYogaToSparkLayoutKeys = (layout: {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  const { type, props, node } = nodeObject

  const nodeLayout: NodeLayout = node.getComputedLayout()

  const element = scene.create({
    t: type,
    ...props,
    parent,
    ...translateYogaToSparkLayoutKeys(nodeLayout),
    stretchX: SparkStretch.STRETCH,
    stretchY: SparkStretch.STRETCH,
  })

  if (props.onRef) props.onRef(nodeLayout)

  return { ...nodeObject, nodeLayout, element }
}

export const updateElement = (newNode: ViewElement, oldNode: ViewElement) => {
  const { node, element } = newNode

  const newNodeLayout: NodeLayout = node.getComputedLayout()

  const styleDiff: Style = getObjectDiff(newNodeLayout, oldNode.nodeLayout)
  const propsDiff: Props = getObjectDiff(newNode.props, oldNode.props)

  if (Object.keys(styleDiff).length > 0) {
    // TODO should be dynamic
    element.animateTo(
      { ...translateYogaToSparkLayoutKeys(styleDiff) },
      1,
      SparkTween.EASE_OUT_ELASTIC,
    )
  }

  const propsDiffKeys: string[] = Object.keys(propsDiff)
  if (propsDiffKeys.length > 0) {
    propsDiffKeys.forEach((key: string) => {
      element[key] = propsDiff[key]
    })
  }

  if (newNode.props.onRef) newNode.props.onRef(newNodeLayout)

  return { ...newNode, nodeLayout: newNodeLayout }
}

export const destroyElement = (nodeObject: ViewElement) => {
  const { element } = nodeObject
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
  // in case of first render
  if (!oldNode) newParent = createElement(scene, parent, newNode)
  // when we have a new and old node, but new nodes type is different
  if (oldNode && newNode && oldNode.type !== newNode.type) {
    destroyElement(oldNode)
    newParent = createElement(scene, parent, newNode)
  }
  // when we have a new and old node and we wanna update style or props
  if (oldNode && newNode) {
    newParent = updateElement(
      {
        ...newNode,
        element: oldNode.element,
      },
      oldNode,
    )
  }
  // when we don't have an new node so we want to delete the old node
  if (oldNode && oldNode.element && !newNode) {
    destroyElement(oldNode)
    return null
  }
  return {
    ...newParent,
    children: [...Array(getChildrenMaxLength(newNode, oldNode))].map((
      _: any, // eslint-disable-line @typescript-eslint/no-explicit-any
      idx: number,
    ) =>
      recursivelyRenderNodes(
        scene,
        newParent ? newParent.element : null,
        newNode && newNode.children[idx],
        oldNode && oldNode.children[idx],
      ),
    ),
  }
}
