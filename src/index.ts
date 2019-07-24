import { initView } from './yoga'
import { ViewElement } from './yoga/types'
import { SparkScene, SparkEvents } from './spark/types'
import { inspect } from 'util'

declare let px: {
  import: (file: string) => Promise<SparkScene>
}

export * from './components'
export * from './spark/types'
export * from './yoga'
export * from './yoga/types'

let sparkScene: SparkScene
let previousViews: ViewElement

let iterations = 0
const getSelectableElements = (tree: ViewElement): any[] => {
  iterations += 1
  const { x, y, w, h } = tree.element
  if (tree.props.selectable) {
    console.log(x, y, w, h)
    return []
  }
  return tree.children.map((child: ViewElement) => getSelectableElements(child))
}

/**
 * render should probably take a function that produces an view element as first parameter
 * and then the redux whatever store to be called with as input as the second parameter
 * then we could call the view function with some identifier for the selected element when it updates
 * or for each selectable element we could add a function to update the ViewElement
 * has to be re-render of whole view model because if we should hide stuff when element get's selected
 */
export const render = async (
  view: (store: object) => ViewElement,
  store: object,
): Promise<void> => {
  // first render
  if (!sparkScene) {
    sparkScene = await px.import('px:scene.1.js')
    previousViews = initView(view(store), previousViews, sparkScene)
    getSelectableElements(previousViews)
    console.log(iterations)
    sparkScene.root.focus = true
    sparkScene.root.on(SparkEvents.OnKeyDown, e => console.log('here', e))
  } else {
    sparkScene.root.focus = true
    previousViews = initView(view(store), previousViews, sparkScene)
  }
}
