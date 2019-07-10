// https://github.com/facebook/yoga/blob/master/javascript/sources/YGEnums.js
import yoga from 'yoga-layout'

export enum Display {
  Flex = yoga.DISPLAY_FLEX,
  None = yoga.DISPLAY_NONE,
}

export enum Position {
  Relative = yoga.POSITION_TYPE_RELATIVE,
  Absolute = yoga.POSITION_TYPE_ABSOLUTE,
}

export enum Overflow {
  Visible = yoga.OVERFLOW_VISIBLE,
  Hidden = yoga.OVERFLOW_HIDDEN,
  Scroll = yoga.OVERFLOW_SCROLL,
}

export enum AlignItems {
  Auto = yoga.ALIGN_AUTO,
  FlexStart = yoga.ALIGN_FLEX_START,
  Center = yoga.ALIGN_CENTER,
  FlexEnd = yoga.ALIGN_FLEX_END,
  Stretch = yoga.ALIGN_STRETCH,
  Baseline = yoga.BASELINE,
  SpaceBetween = yoga.ALIGN_SPACE_BETWEEN,
  SpaceAround = yoga.ALIGN_SPACE_AROUND,
}

export enum JustifyContent {
  FlexStart = yoga.JUSTIFY_FLEX_START,
  Center = yoga.JUSTIFY_CENTER,
  FlexEnd = yoga.JUSTIFY_FLEX_END,
  SpaceBetween = yoga.JUSTIFY_SPACE_BETWEEN,
  SpaceAround = yoga.JUSTIFY_SPACE_AROUND,
  SpaceEvenly = yoga.JUSTIFY_SPACE_EVENLY,
}

export enum FlexDirection {
  Column = yoga.FLEX_DIRECTION_COLUMN,
  Row = yoga.FLEX_DIRECTION_ROW,
}

export enum FlexWrap {
  Wrap = yoga.WRAP_WRAP,
  NoWrap = yoga.WRAP_NO_WRAP,
  WrapReverse = yoga.WRAP_REVERSE,
}

export enum Padding {
  Right = yoga.EDGE_RIGHT,
  Left = yoga.EDGE_LEFT,
  Top = yoga.EDGE_TOP,
  Bottom = yoga.EDGE_BOTTOM,
}

export interface Style {
  display?: Display
  position?: Position
  overflow?: Overflow
  alignItems?: AlignItems
  justifyContent?: JustifyContent
  flexDirection?: FlexDirection
  flexWrap?: FlexWrap
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
}
