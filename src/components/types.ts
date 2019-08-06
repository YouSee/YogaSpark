import { YogaNode } from 'yoga-layout'
import { NodeLayout, Style } from '../yoga/types'
import { SparkObjectTypes, SparkObject } from '../spark/types'

export type OnRef = (nodeLayout: NodeLayout) => void
export interface Props {
  url?: string
  text?: string
  fillColor?: string | number
  clip?: boolean
  mask?: boolean
  draw?: boolean
  selectable?: boolean
  active?: boolean
  key?: string
  onRef?: OnRef
  onClick?: () => void
  [key: string]: string | boolean | number | OnRef
}

export interface State {
  [key: string]: NodeLayout
}

export interface ViewElement {
  type: SparkObjectTypes
  node: YogaNode
  props: Props
  style: Style
  element?: SparkObject
  nodeLayout?: NodeLayout
  children: ViewElement[]
}
