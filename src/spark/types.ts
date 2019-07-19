// from http://www.sparkui.org//docs/apis/index.html#animation_options
export enum SparkTween {
  TWEEN_LINEAR = 0,
  TWEEN_EXP1 = 1,
  TWEEN_EXP2 = 2,
  TWEEN_EXP3 = 3,
  TWEEN_STOP = 4,
  EASE_IN_QUAD = 5,
  EASE_IN_CUBIC = 6,
  EASE_IN_BACK = 7,
  EASE_IN_ELASTIC = 8,
  EASE_OUT_ELASTIC = 9,
  EASE_OUT_BOUNCE = 10,
}

export enum SparkType {
  OPTION_OSCILLATE = 1,
  OPTION_LOOP = 2,
  OPTION_FASTFORWARD = 8,
  OPTION_REWIND = 16,
}

export enum SparkCount {
  COUNT_FOREVER = -1,
}

export enum SparkEvents {
  OnMouseDown = 'onMouseDown',
  OnMouseUp = 'onMouseUp',
  OnMouseMove = 'onMouseMove',
  OnMouseEnter = 'onMouseEnter',
  OnMouseLeave = 'onMouseLeave',
  OnFocus = 'onFocus',
  OnBlur = 'onBlur',
  OnKeyDown = 'onKeyDown',
  OnKeyUp = 'onKeyUp',
  OnChar = 'onChar',
  OnSize = 'onSize',
}

export enum SparkSceneEvents {
  OnResize = 'onResize',
  OnClose = 'onClose',
}

export enum SparkStretch {
  NONE = 0,
  STRETCH = 1,
  REPEAT = 2,
}

export enum SparkAlignVertical {
  TOP = 0,
  CENTER = 1,
  BOTTOM = 2,
}

export enum SparkAlignHorizontal {
  LEFT = 0,
  CENTER = 1,
  RIGHT = 2,
}

export enum SparkTrucation {
  NONE = 0,
  TRUNCATE = 1,
  TRUCATE_AT_WORD = 2,
}

// only currently implemented types
export enum SparkObjectTypes {
  Text = 'text',
  Rect = 'rect',
  Image = 'image',
  Scene = 'scene',
}
// from http://www.sparkui.org//docs/apis/index.html
export interface SparkScene {
  root: SparkObject
  w: number
  h: number
  animation: SparkTween
  stretch: SparkStretch
  alignVertical: SparkAlignVertical
  alignHorizontal: SparkAlignHorizontal
  trucation: SparkTrucation
  create: (json: SparkObjectPropertiesCreate) => SparkObject
  on: (type: SparkSceneEvents, callback: (e: any) => any) => void
  delListener: (type: SparkSceneEvents, callback: () => void) => void
  getFocus: () => SparkObject
}
export interface SparkObjectProperties {
  parent?: SparkObject
  x?: number
  y?: number
  w?: number
  h?: number
  cx?: number
  cy?: number
  sx?: number
  sy?: number
  a?: number
  r?: number
  id?: string
  interactive?: boolean
  painting?: boolean
  clip?: boolean
  mask?: boolean
  draw?: boolean
  focus?: boolean
  numChildren?: number
  children?: SparkObject[]
  // image
  stretchX?: SparkStretch
  stretchY?: SparkStretch
}

export interface SparkObjectPropertiesCreate extends SparkObjectProperties {
  t: SparkObjectTypes
}

export interface SparkObject extends SparkObjectProperties {
  getChild: (index: number) => SparkObject
  remove: () => void
  removeAll: () => void
  moveToFront: () => void
  moveToBack: () => void
  moveForward: () => void
  moveBackward: () => void
  animateTo: (
    json: SparkObjectProperties,
    duration: number,
    tween: SparkTween,
    type?: SparkType,
    count?: SparkCount,
  ) => Promise<SparkObject>
  animate: (
    json: SparkObjectProperties,
    duration: number,
    tween: SparkTween,
    type?: SparkType,
    count?: SparkCount,
  ) => SparkObject
  on: (event: SparkEvents, callback: () => void) => void
  delListener: (event: SparkEvents, callback: () => void) => void
  getObjectById: (id: number) => SparkObject
  // scene
  url?: string
  // rect
  fillColor?: number
  lineColor?: number
  lineWidth?: number
  // image
  stretchX?: SparkStretch
  stretchY?: SparkStretch
  ready?: Promise<SparkObject>
  // text
  text?: string
  // for dynamicly uploading props...
  [key: string]: any
}
