import { ViewElement } from '../components/types'

export const getBoundingBoxRight = (
  viewElement: ViewElement,
): [number, number, number] => {
  const { x, y, w, h } = viewElement.element
  const xAxisStart = x + w
  const yAxisTop = y
  const yAxisBottom = y + h
  return [yAxisTop, yAxisBottom, xAxisStart]
}

export const getBoundingBoxLeft = (
  viewElement: ViewElement,
): [number, number, number] => {
  const { x, y, h } = viewElement.element
  const xAxisStart = x
  const yAxisTop = y
  const yAxisBottom = y + h
  return [yAxisTop, yAxisBottom, xAxisStart]
}

export const getBoundingBoxUp = (
  viewElement: ViewElement,
): [number, number, number] => {
  const { x, y, w } = viewElement.element
  const yAxisStart = y
  const xAxisStart = x
  const xAxisEnd = x + w
  return [xAxisStart, xAxisEnd, yAxisStart]
}

export const getBoundingBoxDown = (
  viewElement: ViewElement,
): [number, number, number] => {
  const { x, y, h, w } = viewElement.element
  const yAxisStart = y + h
  const xAxisStart = x
  const xAxisEnd = x + w
  return [xAxisStart, xAxisEnd, yAxisStart]
}

export const primaryAxisSelectorNegative = (
  currentAxis: number,
  activeAxis: number,
): boolean => currentAxis < activeAxis

export const primaryAxisSelectorPositive = (
  currentAxis: number,
  activeAxis: number,
): boolean => currentAxis > activeAxis

export const isElementInBox = (
  viewElement: ViewElement,
  activeElement: ViewElement,
  getBoudingRect: (viewElement: ViewElement) => [number, number, number],
  primaryAxisSelector: (currentAxis: number, activeAxis: number) => boolean,
): boolean => {
  const [
    currentSecondaryAxisStart,
    currentSecondaryAxisEnd,
    currentPrimaryAxisStart,
  ] = getBoudingRect(viewElement)
  const [
    activeSecondaryAxisStart,
    activeSecondaryAxisEnd,
    activePrimaryAxisStart,
  ] = getBoudingRect(activeElement)

  const isInBox =
    (currentSecondaryAxisStart >= activeSecondaryAxisStart ||
      currentSecondaryAxisEnd <= activeSecondaryAxisEnd) &&
    // start should be less than active end
    currentSecondaryAxisStart <= activeSecondaryAxisEnd &&
    // end should be larger than start
    currentSecondaryAxisEnd >= activeSecondaryAxisStart &&
    // selector used for checking if it's after primary axis coordinate
    primaryAxisSelector(currentPrimaryAxisStart, activePrimaryAxisStart)
  return isInBox
}

export const isElementSelectableInBox = (
  boundingRectFunc: (viewElement: ViewElement) => [number, number, number],
  primaryAxisSelector: (currentAxis: number, activeAxis: number) => boolean,
): ((viewElement: ViewElement, activeElement: ViewElement) => boolean) => (
  viewElement: ViewElement,
  activeElement: ViewElement,
) =>
  isElementInBox(
    viewElement,
    activeElement,
    boundingRectFunc,
    primaryAxisSelector,
  )

export const getPrimaryAxisForDownAndUp = (viewElement: ViewElement): number =>
  viewElement.element.y

export const getPrimaryAxisForLeftAndRight = (
  viewElement: ViewElement,
): number => viewElement.element.x

export const getPrimarySizeForDownAndUp = (viewElement: ViewElement): number =>
  viewElement.element.w

export const getPrimarySizeForLeftAndRight = (
  viewElement: ViewElement,
): number => viewElement.element.h

export const isElementCloser = (
  viewElement: ViewElement,
  activeElement: ViewElement,
  isInSelectableArea: (
    viewElement: ViewElement,
    activeElement: ViewElement,
  ) => boolean,
  getPrimaryAxisValue: (viewElement: ViewElement) => number,
  getSecondaryAxisValue: (viewElement: ViewElement) => number,
  previousViewElement?: ViewElement,
): boolean => {
  if (isInSelectableArea(viewElement, activeElement)) {
    if (!previousViewElement) return true
    const currentDistance = Math.abs(
      getPrimaryAxisValue(viewElement) - getPrimaryAxisValue(activeElement),
    )
    const previousDistance = Math.abs(
      getPrimaryAxisValue(previousViewElement) -
        getPrimaryAxisValue(activeElement),
    )
    // should handle elements with same distance on primary axis
    if (currentDistance === previousDistance) {
      const secondAxis = getSecondaryAxisValue(viewElement)
      const secondActiveAxis = getSecondaryAxisValue(activeElement)
      const secondPreviousAxis = getSecondaryAxisValue(previousViewElement)

      const currentSecondaryDistance = Math.abs(secondAxis - secondActiveAxis)
      const previousSecondDistance = Math.abs(
        secondPreviousAxis - secondActiveAxis,
      )

      return currentSecondaryDistance < previousSecondDistance
    }
    return currentDistance < previousDistance
  }
  return false
}
