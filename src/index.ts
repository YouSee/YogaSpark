import { Store } from 'redux'
import { initView } from './yoga'
import { ViewElement } from './yoga/types'
import { SparkScene } from './spark/types'
import { KeysMap } from './keyboard/types'
import { listenForKeyboardInput } from './keyboard'

declare let px: {
  import: (file: string) => Promise<any>
}

export * from './components'
export * from './spark/types'
export * from './yoga'
export * from './yoga/types'

export let sparkScene: SparkScene
export let previousViews: ViewElement
export let keysMap: KeysMap
export let activeElementKey = 'roundedImage/0'

export const render = async (
  view: (store: object, activeElementKey: string) => ViewElement,
  store?: Store,
): Promise<void> => {
  const updateView = (elementKey: string): void => {
    if (elementKey !== activeElementKey) activeElementKey = elementKey
    previousViews = initView(
      view(store.getState(), activeElementKey),
      previousViews,
      sparkScene,
    )
  }
  // first render
  if (!sparkScene || !keysMap) {
    sparkScene = await px.import('px:scene.1.js')
    keysMap = await px.import('px:tools.keys.js')

    listenForKeyboardInput(sparkScene, keysMap, updateView)
    if (store) store.subscribe(() => updateView(activeElementKey))
    updateView(activeElementKey)
  } else {
    updateView(activeElementKey)
  }
}
