import { previousViews, activeElementKey } from '../'
import { KeysMap, KeyEvent, Keys } from './types'
import { ViewElement } from '../yoga/types'
import { SparkScene, SparkEvents } from '../spark/types'
import { inspect } from 'util'

import { findActiveElementSelector, findNewElementsSelector } from './selectors'

// change this function so it can be balled with currentNode, previousNode in the selector function
// then we can make the find new element function simpler
const findElementInTree = (
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
      const previousActiveElement: ViewElement = findElementInTree(
        previousViews,
        viewElement => findActiveElementSelector(viewElement, activeElementKey),
      )

      console.log('found here', inspect(previousActiveElement.props))

      const nearestNeighbor: ViewElement = findElementInTree(
        previousViews,
        (viewElement: ViewElement, previousElement?: ViewElement) =>
          findNewElementsSelector(
            viewElement,
            previousActiveElement,
            keyAction,
            previousElement,
          ),
      )

      console.log(inspect(nearestNeighbor.props))

      if (nearestNeighbor && nearestNeighbor.props.key)
        onNewElementInFocus(nearestNeighbor.props.key)
    }
  })
}
