import yoga, { Node } from 'yoga-layout'
import {
  Position,
  OverFlow,
  AlignItems,
  JustifyContent,
  FlexDirection,
  FlexWrap,
  Padding,
  Style,
} from './layout'

const WINDOW_WIDTH = 1280
const WINDOW_HEIGHT = 720

export const flatten = (list: Array<any>): Array<any> =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

export const createYogaStyleObject = (
  node: Node,
  style: Style,
  children: Array<Node>,
) => ({ node, style, children })

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

export const view = (style: Style, children: Array<Node>) => {
  const node = createNode(style)
  if (children && children.length > 0)
    children.map(({ node: childNode }: Node, index: number) => {
      node.insertChild(childNode, index)
    })
  return createYogaStyleObject(node, style, children)
}

export const initView = (node: Node, scene: any) => {
  const { root } = scene
  root.h = WINDOW_HEIGHT
  root.w = WINDOW_WIDTH
  node.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR)
  return node.getComputedLayout()
}
