import { previousViews, activeElementKey } from '..'
import { KeysMap, KeyEvent, Keys } from './types'
import { ViewElement } from '../yoga/types'
import { SparkScene, SparkEvents } from '../spark/types'

import { findActiveElementSelector, findNewElementsSelector } from './selectors'

// change this function so it can be balled with currentNode, previousNode in the selector function
// then we can make the find new element function simpler
export const findElementInTree = (
  tree: ViewElement,
  selector: (view: ViewElement, previousView?: ViewElement) => boolean,
  previousTree?: ViewElement,
): ViewElement => {
  if (selector(tree, previousTree)) {
    return tree
  }

  return tree.children.reduce(
    (accumulator: ViewElement, child: ViewElement) => {
      const node = findElementInTree(child, selector, accumulator)
      if (node) {
        return node
      }
      return accumulator
    },
    null,
  )
}

export const getKeyTemplate = (keysMap: KeysMap) => ({
  [keysMap.LEFT]: Keys.Left,
  [keysMap.UP]: Keys.Up,
  [keysMap.RIGHT]: Keys.Right,
  [keysMap.DOWN]: Keys.Down,
  [keysMap.ENTER]: Keys.Enter,
})

export const mapEventToKey = (keyCode: number, keysMap: KeysMap) =>
  getKeyTemplate(keysMap)[keyCode]

export const handleArrowKeys = (
  keyAction: Keys,
  onNewElementInFocus: (elementKey: string) => void,
  previousElementViews: ViewElement = previousViews,
  activeKey: string = activeElementKey,
): void => {
  const previousActiveElement: ViewElement = findElementInTree(
    previousElementViews,
    viewElement => findActiveElementSelector(viewElement, activeKey),
  )

  const nearestNeighbor: ViewElement = findElementInTree(
    previousElementViews,
    (viewElement: ViewElement, previousElement?: ViewElement) =>
      findNewElementsSelector(
        viewElement,
        previousActiveElement,
        keyAction,
        previousElement,
      ),
  )

  if (nearestNeighbor && nearestNeighbor.props.key)
    onNewElementInFocus(nearestNeighbor.props.key)
}

export const handleEnterKey = (
  previousElementViews: ViewElement = previousViews,
  activeKey: string = activeElementKey,
): void => {
  const previousActiveElement: ViewElement = findElementInTree(
    previousElementViews,
    viewElement => findActiveElementSelector(viewElement, activeKey),
  )
  if (previousActiveElement.props.onClick) previousActiveElement.props.onClick()
}

export const listenForKeyboardInput = (
  sparkScene: SparkScene,
  keysMap: KeysMap,
  onNewElementInFocus: (elementKey: string) => void,
): void => {
  sparkScene.root.on(SparkEvents.OnKeyDown, ({ keyCode }: KeyEvent): void => {
    const keyAction: Keys = mapEventToKey(keyCode, keysMap)
    // only supported keyboard actions
    switch (keyAction) {
      case Keys.Down:
      case Keys.Up:
      case Keys.Left:
      case Keys.Right:
        handleArrowKeys(keyAction, onNewElementInFocus)
        break
      case Keys.Enter:
        handleEnterKey()
      default:
        break
    }
  })
}
