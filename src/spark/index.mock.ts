import {
  SparkScene,
  SparkObject,
  SparkTween,
  SparkStretch,
  SparkAlignVertical,
  SparkAlignHorizontal,
  SparkTrucation,
} from './types'

export const getObject = (
  x?: number,
  y?: number,
  w?: number,
  h?: number,
): SparkObject => ({
  getChild: jest.fn(),
  remove: jest.fn(),
  removeAll: jest.fn(),
  moveToFront: jest.fn(),
  moveToBack: jest.fn(),
  moveForward: jest.fn(),
  moveBackward: jest.fn(),
  animateTo: jest.fn(),
  animate: jest.fn(),
  on: jest.fn(),
  delListener: jest.fn(),
  getObjectById: jest.fn(),
  x,
  y,
  h,
  w,
})

export const getScene = (): SparkScene => ({
  root: null,
  w: 100,
  h: 100,
  animation: SparkTween.TWEEN_LINEAR,
  stretch: SparkStretch.NONE,
  alignVertical: SparkAlignVertical.CENTER,
  alignHorizontal: SparkAlignHorizontal.CENTER,
  trucation: SparkTrucation.NONE,
  create: jest.fn().mockReturnValue(getObject()),
  on: jest.fn(),
  delListener: jest.fn(),
  getFocus: jest.fn(),
})
