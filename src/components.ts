import { Style } from './layout'
import { createNodeTree } from './yoga'

export interface Props {
  url?: string
  text?: string
}

export const scene = (style: Style, children: Array<Node>) =>
  createNodeTree('scene', {}, style, children)

export const view = (style: Style, children: Array<Node>) =>
  createNodeTree('rect', {}, style, children)

export const image = (props: Props, style: Style, children: Array<Node>) =>
  createNodeTree('image', props, style, children)

export const text = (props: Props, style: Style, children: Array<Node>) =>
  createNodeTree('text', props, style, children)
