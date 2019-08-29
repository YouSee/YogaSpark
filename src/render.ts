import { Store } from 'redux'
import { ViewElement } from './components/types'
import { initView } from './yoga'
import {
  getScene,
  setScene,
  getViewElement,
  setViewElement,
  getKeysMap,
  setKeysMap,
  getActiveKey,
  setActiveKey,
} from './state'
import { listenForKeyboardInput } from './keyboard'

declare let px: {
  import: (file: string) => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const render = async (
  view: (store: Store, activeElementKey: string) => ViewElement,
  store?: Store,
): Promise<void> => {
  const updateView = (elementKey: string): void => {
    if (elementKey !== getActiveKey()) setActiveKey(elementKey)
    setViewElement(
      initView(
        view(store.getState(), getActiveKey()),
        getViewElement(),
        getScene(),
      ),
    )
  }

  // first render
  if (!getScene() || !getKeysMap()) {
    const sparkScene = await px.import('px:scene.1.js')
    const keysMap = await px.import('px:tools.keys.js')
    setScene(sparkScene)
    setKeysMap(keysMap)

    listenForKeyboardInput(getScene(), getKeysMap(), updateView)
    if (store) store.subscribe(() => updateView(getActiveKey()))
    updateView(getActiveKey())
  } else {
    updateView(getActiveKey())
  }
}
