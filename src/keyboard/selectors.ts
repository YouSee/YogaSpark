import { ViewElement } from '../yoga/types'
import { Keys } from './types'
import {
  getBoundingBoxRight,
  getBoundingBoxLeft,
  getBoundingBoxUp,
  getBoundingBoxDown,
  isElementCloser,
  isElementSelectableInBox,
  primaryAxisSelectorPositive,
  primaryAxisSelectorNegative,
  getPrimaryAxisForDownAndUp,
  getPrimaryAxisForLeftAndRight,
} from './bounding'

export const findActiveElementSelector = (
  viewElement: ViewElement,
  activeElementKey: string,
) => viewElement.props.key === activeElementKey

export const findNewElementsSelector = (
  viewElement: ViewElement,
  previousActiveElement: ViewElement,
  keyAction: Keys,
  previousViewElement?: ViewElement,
) => {
  if (viewElement.props.selectable) {
    const { x, y } = previousActiveElement.element
    const { x: newX, y: newY } = viewElement.element
    // if it's the current active element
    if (x === newX && y === newY) {
      return false
    }
    switch (keyAction) {
      case Keys.Right: {
        if (
          isElementCloser(
            viewElement,
            previousActiveElement,
            isElementSelectableInBox(
              getBoundingBoxRight,
              primaryAxisSelectorPositive,
            ),
            getPrimaryAxisForLeftAndRight,
            previousViewElement,
          )
        ) {
          return true
        }
        return false
      }
      case Keys.Left: {
        if (
          isElementCloser(
            viewElement,
            previousActiveElement,
            isElementSelectableInBox(
              getBoundingBoxLeft,
              primaryAxisSelectorNegative,
            ),
            getPrimaryAxisForLeftAndRight,
            previousViewElement,
          )
        ) {
          return true
        }
        return false
      }
      case Keys.Up: {
        if (
          isElementCloser(
            viewElement,
            previousActiveElement,
            isElementSelectableInBox(
              getBoundingBoxUp,
              primaryAxisSelectorNegative,
            ),
            getPrimaryAxisForDownAndUp,
            previousViewElement,
          )
        ) {
          return true
        }
        return false
      }
      case Keys.Down: {
        if (
          isElementCloser(
            viewElement,
            previousActiveElement,
            isElementSelectableInBox(
              getBoundingBoxDown,
              primaryAxisSelectorPositive,
            ),
            getPrimaryAxisForDownAndUp,
            previousViewElement,
          )
        ) {
          return true
        }
        return false
      }
    }
  }
  return false
}
