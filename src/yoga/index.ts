import Yoga, { Node, YogaNode } from 'yoga-layout'
import { EDGES, Style } from './types'
import { Props } from '../components'
import { SparkObject, SparkScene, SparkObjectTypes } from '../spark/types'
import { recursivelyRenderNodes } from '../spark'

export const WINDOW_WIDTH = 1280
export const WINDOW_HEIGHT = 720

export interface NodeLayout {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}
export interface ViewElement {
  type: SparkObjectTypes
  node: YogaNode
  props: Props
  style: Style
  element?: SparkObject
  nodeLayout?: NodeLayout
  children: Array<ViewElement>
}

export const createViewElement = (
  type: SparkObjectTypes,
  node: YogaNode,
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => ({ type, node, props, style, children })

export const createNode = (style: Style, yogaNode: any = Node): YogaNode => {
  const node: YogaNode = yogaNode.create()
  if (style.display) node.setDisplay(style.display)
  if (style.overflow) node.setOverflow(style.overflow)
  if (style.top) node.setPosition(EDGES.EDGE_TOP, style.top)
  if (style.alignItems) node.setAlignItems(style.alignItems)
  if (style.justifyContent) node.setJustifyContent(style.justifyContent)
  if (style.flexDirection) node.setFlexDirection(style.flexDirection)
  if (style.flexWrap) node.setFlexWrap(style.flexWrap)
  if (style.flexGrow) node.setFlexGrow(style.flexGrow)
  if (style.flexShrink) node.setFlexShrink(style.flexShrink)
  if (style.flexBasis) node.setFlexBasis(style.flexBasis)
  if (style.paddingRight) node.setPadding(EDGES.EDGE_RIGHT, style.paddingRight)
  if (style.paddingLeft) node.setPadding(EDGES.EDGE_LEFT, style.paddingLeft)
  if (style.paddingBottom)
    node.setPadding(EDGES.EDGE_BOTTOM, style.paddingBottom)
  if (style.paddingTop) node.setPadding(EDGES.EDGE_TOP, style.paddingTop)
  if (style.marginRight) node.setMargin(EDGES.EDGE_RIGHT, style.marginRight)
  if (style.marginLeft) node.setMargin(EDGES.EDGE_LEFT, style.marginLeft)
  if (style.marginBottom) node.setMargin(EDGES.EDGE_BOTTOM, style.marginBottom)
  if (style.marginTop) node.setMargin(EDGES.EDGE_TOP, style.marginTop)
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
    children.map(({ node: childNode }: ViewElement, index: number) => {
      node.insertChild(childNode, index)
    })
  return createViewElement(type, node, props, style, children)
}

export const initView = (
  views: ViewElement,
  previousViews: ViewElement,
  scene: SparkScene,
): ViewElement => {
  const { root } = scene
  root.h = WINDOW_HEIGHT
  root.w = WINDOW_WIDTH
  views.node.calculateLayout(0, 0, 1)
  return recursivelyRenderNodes(scene, root, views, previousViews)
}
