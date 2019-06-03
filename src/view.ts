import yoga, { Node } from 'yoga-layout'
import { Position, OverFlow, AlignItems, JustifyContent, FlexDirection, FlexWrap, Style } from './layout'

const WINDOW_WIDTH = 1280
const WINDOW_HEIGHT = 720

export const flatten = (list: Array<any>): Array<any> => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

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
  if (style.height) node.setHeight(style.height)
  if (style.width) node.setWidth(style.width)
  return node
}

export const view = (style: Style, children: Array<Node>) => {
  const node = createNode(style)
  const flattenedChildren = flatten(children)
  if (flattenedChildren && flattenedChildren.length > 0)
    flattenedChildren.map((child: Node, index: number) => {
      !child.getParent() && node.insertChild(child, index)
    })
  return [node, ...flattenedChildren]
}

export const initView = (node: Node, scene: any) => {
  const { root } = scene
  root.h = WINDOW_HEIGHT
  root.w = WINDOW_WIDTH
  node.calculateLayout(WINDOW_WIDTH, WINDOW_HEIGHT, yoga.DIRECTION_INHERIT);
  return node.getComputedLayout()
}