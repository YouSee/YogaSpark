import yoga, { Node } from 'yoga-layout'
import { Padding, Style } from './types'
import { Props } from '../components'
import { SparkObject, SparkScene, SparkObjectTypes } from '../spark/types'
import { recursivelyRenderNodes } from '../spark'

export const WINDOW_WIDTH = 1280
export const WINDOW_HEIGHT = 720

export interface ViewElement {
  type: SparkObjectTypes
  node: Node
  props: Props
  style: Style
  element?: SparkObject
  children: Array<ViewElement>
}

export const createYogaStyleObject = (
  type: SparkObjectTypes,
  node: Node,
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => ({ type, node, props, style, children })

export const createNode = (style: Style): Node => {
  const node = Node.create()
  if (style.display) node.setDisplay(style.display)
  if (style.position) node.setPosition(style.position)
  if (style.overflow) node.setOverflow(style.overflow)
  if (style.alignItems) node.setAlignItems(style.alignItems)
  if (style.justifyContent) node.setJustifyContent(style.justifyContent)
  if (style.flexDirection) node.setFlexDirection(style.flexDirection)
  if (style.flexWrap) node.setFlexWrap(style.flexWrap)
  if (style.flexGrow) node.setFlexGrow(style.flexGrow)
  if (style.flexShrink) node.setFlexShrink(style.flexShrink)
  if (style.flexBasis) node.setFlexBasis(style.flexBasis)
  if (style.paddingRight) node.setPadding(Padding.Right, style.paddingRight)
  if (style.paddingLeft) node.setPadding(Padding.Left, style.paddingLeft)
  if (style.paddingBottom) node.setPadding(Padding.Bottom, style.paddingBottom)
  if (style.paddingTop) node.setPadding(Padding.Top, style.paddingTop)
  if (style.marginRight) node.setMargin(Padding.Right, style.marginRight)
  if (style.marginLeft) node.setMargin(Padding.Left, style.marginLeft)
  if (style.marginBottom) node.setMargin(Padding.Bottom, style.marginBottom)
  if (style.marginTop) node.setMargin(Padding.Top, style.marginTop)
  if (style.height) node.setHeight(style.height)
  if (style.width) node.setWidth(style.width)
  return node
}

export const createNodeTree = (
  type: SparkObjectTypes,
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => {
  const node = createNode(style)
  if (children.length > 0)
    children.map(({ node: childNode }: Node, index: number) => {
      node.insertChild(childNode, index)
    })
  return createYogaStyleObject(type, node, props, style, children)
}

export const initView = (
  views: ViewElement,
  previousViews: ViewElement,
  scene: SparkScene,
): ViewElement => {
  const { root } = scene
  root.h = WINDOW_HEIGHT
  root.w = WINDOW_WIDTH
  views.node.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR)
  return recursivelyRenderNodes(scene, root, views, previousViews)
}
