import yoga, { Node } from 'yoga-layout'
import { Position, OverFlow, AlignItems, JustifyContent, FlexDirection, FlexWrap, Style } from './layout'

const WINDOW_WIDTH = 1280
const WINDOW_HEIGHT = 720

export const createNode = (style: Style): Node => {
  const node = Node.create()
  if (style.position) node.setPosition(style.position)
  if (style.overflow) node.setOverflow(style.overflow)
  if (style.alignItems) node.setAlignItems(style.alignItems)
  if (style.justifyContent) node.setJustifyContent(style.justifyContent)
  if (style.flexDirection) node.setFlexDirection(style.flexDirection)
  if (style.flexWrap) node.setFlexWrap(style.flexWrap)
  if (style.height) node.setHeight(style.height)
  if (style.width) node.setWidth(style.width)
  return node
}

export const view = (style: Style, children: Array<Node>) => {
  const node = createNode(style)
  if (children && children.length > 0)
    children.map((child: Node, index: number) => node.insertChild(child, index))
  return node
}

export const initView = (node: Node, scene: any) => {
  const { root } = scene
  root.h = WINDOW_HEIGHT
  root.w = WINDOW_WIDTH
  node.calculateLayout(WINDOW_WIDTH, WINDOW_HEIGHT, yoga.DIRECTION_LTR);
  return node.getComputedLayout()
}