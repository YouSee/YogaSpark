export interface Props {
  url?: string
  text?: string
  fillColor?: string | number
  clip?: boolean
  mask?: boolean
  draw?: boolean
  [key: string]: string | boolean | number
}
