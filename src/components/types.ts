import { NodeLayout } from '../yoga/types'

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
  onClick?: () => any
  [key: string]: string | boolean | number | OnRef
}

export interface State {
  [key: string]: NodeLayout
}
