import { Style } from './layout'
import { createNodeTree, ViewElement } from './yoga'
import { SparkObjectTypes } from './spark'

export interface Props {
  url?: string
  text?: string
  fillColor?: string
}

export const scene = (
  style: Style,
  children: Array<ViewElement>,
): ViewElement => createNodeTree(SparkObjectTypes.Scene, {}, style, children)

export const view = (
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => createNodeTree(SparkObjectTypes.Rect, props, style, children)

export const image = (
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => createNodeTree(SparkObjectTypes.Image, props, style, children)

export const text = (
  props: Props,
  style: Style,
  children: Array<ViewElement>,
): ViewElement => createNodeTree(SparkObjectTypes.Text, props, style, children)