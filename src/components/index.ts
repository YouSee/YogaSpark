import { Style, ViewElement } from '../yoga/types'
import { createNodeTree } from '../yoga'
import { SparkObjectTypes } from '../spark/types'
import { Props } from './types'

export const scene = (style: Style, children: ViewElement[]): ViewElement =>
  createNodeTree(SparkObjectTypes.Scene, { mask: true }, style, children)

export const view = (
  props: Props,
  style: Style,
  children: ViewElement[],
): ViewElement => createNodeTree(SparkObjectTypes.Rect, props, style, children)

export const image = (
  props: Props,
  style: Style,
  children: ViewElement[],
): ViewElement => createNodeTree(SparkObjectTypes.Image, props, style, children)

export const text = (
  props: Props,
  style: Style,
  children: ViewElement[],
): ViewElement => createNodeTree(SparkObjectTypes.Text, props, style, children)
