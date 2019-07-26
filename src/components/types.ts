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
  [key: string]: string | boolean | number
}
