import { Style, NodeLayout } from '../yoga/types'
import { ViewElement, Props } from './types'
import { createNodeTree } from '../yoga'
import { SparkObjectTypes } from '../spark/types'

import { globalState, stateHook } from './state'

const [getGlobalState, setGlobalState] = globalState()

export const container = (
  key: string,
  render: (
    getState: () => NodeLayout,
    setState: (state: NodeLayout) => void,
  ) => ViewElement,
): ViewElement => {
  const [getState, setState] = stateHook(key, getGlobalState, setGlobalState)
  return render(getState, setState)
}

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
