import { initView } from './yoga'
import { ViewElement } from './yoga/types'
import { SparkScene } from './spark/types'
import { KeysMap } from './keyboard/types'
import { listenForKeyboardInput } from './keyboard'

declare let px: {
  import: (file: string) => Promise<SparkScene | KeysMap>
}

export * from './components'
export * from './spark/types'
export * from './yoga'
export * from './yoga/types'

export let sparkScene: SparkScene
export let previousViews: ViewElement
export let keysMap: KeysMap
export let activeElementKey: string = 'roundedImage/0'

/**
 * render should probably take a function that produces an view element as first parameter
 * and then the redux whatever store to be called with as input as the second parameter
 * then we could call the view function with some identifier for the selected element when it updates
 * or for each selectable element we could add a function to update the ViewElement
 * has to be re-render of whole view model because if we should hide stuff when element get's selected
 */
export const render = async (
  view: (store: object, activeElementKey: string) => ViewElement,
  store: object,
): Promise<void> => {
  // first render
  if (!sparkScene || !keysMap) {
    sparkScene = await px.import('px:scene.1.js')
    keysMap = await px.import('px:tools.keys.js')
    listenForKeyboardInput(sparkScene, keysMap, (elementKey: string) => {
      activeElementKey = elementKey
      previousViews = initView(
        view(store, elementKey),
        previousViews,
        sparkScene,
      )
    })
    previousViews = initView(
      view(store, activeElementKey),
      previousViews,
      sparkScene,
    )
  } else {
    sparkScene.root.focus = true
    previousViews = initView(
      view(store, activeElementKey),
      previousViews,
      sparkScene,
    )
  }
}
