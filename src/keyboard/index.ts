import { previousViews, activeElementKey } from '../'
import { KeysMap, KeyEvent, Keys } from './types'
import { ViewElement } from '../yoga/types'
import { SparkScene, SparkEvents } from '../spark/types'
import { inspect } from 'util'

const findElementInTree = (
  tree: ViewElement,
  selector: (view: ViewElement) => boolean,
): ViewElement[] => {
  if (selector(tree)) {
    return [tree]
  }

  return tree.children.reduce(
    (accumulator: ViewElement[], child: ViewElement) => {
      const node = findElementInTree(child, selector)
      if (node.length > 0) {
        return [...node, ...accumulator]
      }
      return accumulator
    },
    [],
  )
}

const findActiveElementSelector = (
  viewElement: ViewElement,
  activeElementKey: string,
) => viewElement.props.key === activeElementKey

const findNewElementsSelector = (
  viewElement: ViewElement,
  previousActiveElement: ViewElement,
  keyAction: Keys,
) => {
  if (viewElement.props.selectable) {
    const { x, y } = previousActiveElement.element
    const { x: newX, y: newY } = viewElement.element

    switch (keyAction) {
      case Keys.Right: {
        if (newX > x && newY === y) {
          return true
        }
        return false
      }
      case Keys.Left: {
        if (newX < x && newY === y) return true
        return false
      }
      case Keys.Up: {
        if (newY < y && newX === x) return true
        return false
      }
      case Keys.Down: {
        if (newY > y && newX === x) return true
        return false
      }
    }
  }
  return false
}

const findNearestNeighbor = (
  viewElement: ViewElement,
  selectableElements: ViewElement[],
): ViewElement => {
  const {
    element: { x, y },
  } = viewElement
  return selectableElements.reduce(
    (accumulator: ViewElement, currentElement: ViewElement) => {
      // if first iteration we the current as closes element
      if (!accumulator) return currentElement
      const {
        element: { x: currentlySelectedX, y: currentlySelectedY },
      } = accumulator
      const {
        element: { x: currentElementX, y: currentElementY },
      } = currentElement
      if (Math.abs(currentElementX - x) < Math.abs(currentlySelectedX - x)) {
        return currentElement
      }
      if (Math.abs(currentElementY - y) < Math.abs(currentlySelectedY - y)) {
        return currentElement
      }
      return accumulator
    },
  )
}

const getKeyTemplate = (keysMap: KeysMap) => ({
  [keysMap.LEFT]: Keys.Left,
  [keysMap.UP]: Keys.Up,
  [keysMap.RIGHT]: Keys.Right,
  [keysMap.DOWN]: Keys.Down,
  [keysMap.ENTER]: Keys.Enter,
})

export const mapEventToKey = (keyCode: number, keysMap: KeysMap) =>
  getKeyTemplate(keysMap)[keyCode]

export const listenForKeyboardInput = (
  sparkScene: SparkScene,
  keysMap: KeysMap,
  onNewElementInFocus: (elementKey: string) => void,
): void => {
  sparkScene.root.focus = true
  sparkScene.root.on(SparkEvents.OnKeyDown, ({ keyCode }: KeyEvent): void => {
    const keyAction: Keys = mapEventToKey(keyCode, keysMap)
    // only supported keyboard actions
    if (keyAction) {
      const [previousActiveElement]: ViewElement[] = findElementInTree(
        previousViews,
        viewElement => findActiveElementSelector(viewElement, activeElementKey),
      )
      console.log('found here', inspect(previousActiveElement.props))

      const selectableAtiveElements: ViewElement[] = findElementInTree(
        previousViews,
        (viewElement: ViewElement) =>
          findNewElementsSelector(
            viewElement,
            previousActiveElement,
            keyAction,
          ),
      )

      const nearestNeighbor = findNearestNeighbor(
        previousActiveElement,
        selectableAtiveElements,
      )

      if (nearestNeighbor && nearestNeighbor.props.key)
        onNewElementInFocus(nearestNeighbor.props.key)
    }
  })
}
