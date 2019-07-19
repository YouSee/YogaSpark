// https://github.com/facebook/yoga/blob/master/javascript/sources/YGEnums.js
import {
  YogaDisplay,
  YogaPositionType,
  YogaOverflow,
  YogaAlign,
  YogaJustifyContent,
  YogaFlexDirection,
  YogaFlexWrap,
  EDGE_LEFT,
  EDGE_TOP,
  EDGE_RIGHT,
  EDGE_BOTTOM,
  EDGE_START,
  EDGE_END,
  EDGE_HORIZONTAL,
  EDGE_VERTICAL,
  EDGE_ALL,
  DISPLAY_FLEX,
  DISPLAY_NONE,
  POSITION_TYPE_ABSOLUTE,
  POSITION_TYPE_RELATIVE,
  OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL,
  OVERFLOW_VISIBLE,
  ALIGN_AUTO,
  ALIGN_BASELINE,
  ALIGN_CENTER,
  ALIGN_FLEX_END,
  ALIGN_FLEX_START,
  ALIGN_SPACE_AROUND,
  ALIGN_SPACE_BETWEEN,
  ALIGN_STRETCH,
  JUSTIFY_CENTER,
  JUSTIFY_FLEX_END,
  JUSTIFY_FLEX_START,
  JUSTIFY_SPACE_AROUND,
  JUSTIFY_SPACE_BETWEEN,
  JUSTIFY_SPACE_EVENLY,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_COLUMN_REVERSE,
  FLEX_DIRECTION_COUNT,
  FLEX_DIRECTION_ROW,
  FLEX_DIRECTION_ROW_REVERSE,
  WRAP_NO_WRAP,
  WRAP_WRAP,
  WRAP_WRAP_REVERSE,
  YogaNode,
} from 'yoga-layout'
import { SparkObject, SparkObjectTypes } from '../spark/types'
import { Props } from '../components/types'

export const EDGES = {
  EDGE_LEFT,
  EDGE_TOP,
  EDGE_RIGHT,
  EDGE_BOTTOM,
  EDGE_START,
  EDGE_END,
  EDGE_HORIZONTAL,
  EDGE_VERTICAL,
  EDGE_ALL,
}

export const DISPLAY = {
  DISPLAY_FLEX,
  DISPLAY_NONE,
}

export const POSITION = {
  POSITION_TYPE_ABSOLUTE,
  POSITION_TYPE_RELATIVE,
}

export const OVERFLOW = {
  OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL,
  OVERFLOW_VISIBLE,
}

export const ALIGN = {
  ALIGN_AUTO,
  ALIGN_BASELINE,
  ALIGN_CENTER,
  ALIGN_FLEX_END,
  ALIGN_FLEX_START,
  ALIGN_SPACE_AROUND,
  ALIGN_SPACE_BETWEEN,
  ALIGN_STRETCH,
}

export const JUSTIFY_CONTENT = {
  JUSTIFY_CENTER,
  JUSTIFY_FLEX_END,
  JUSTIFY_FLEX_START,
  JUSTIFY_SPACE_AROUND,
  JUSTIFY_SPACE_BETWEEN,
  JUSTIFY_SPACE_EVENLY,
}

export const FLEX_DIRECTION = {
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_COLUMN_REVERSE,
  FLEX_DIRECTION_COUNT,
  FLEX_DIRECTION_ROW,
  FLEX_DIRECTION_ROW_REVERSE,
}

export const FLEX_WRAP = {
  WRAP_NO_WRAP,
  WRAP_WRAP,
  WRAP_WRAP_REVERSE,
}

export interface Style {
  display?: YogaDisplay
  position?: YogaPositionType
  overflow?: YogaOverflow
  alignItems?: YogaAlign
  justifyContent?: YogaJustifyContent
  flexDirection?: YogaFlexDirection
  flexWrap?: YogaFlexWrap
  flexGrow?: number
  flexShrink?: number
  flexBasis?: number | string
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  width?: number | string
  height?: number
  top?: number
}
export interface NodeLayout {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
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
