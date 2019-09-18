import { ViewElement } from './components/types'
import { SparkScene } from './spark/types'
import { KeysMap } from './keyboard/types'

const appState = (): {
  getScene: () => SparkScene
  setScene: (scene: SparkScene) => void
  getViewElement: () => ViewElement
  setViewElement: (view: ViewElement) => void
  getKeysMap: () => KeysMap
  setKeysMap: (keys: KeysMap) => void
  getActiveKey: () => string
  setActiveKey: (activeKey: string) => void
} => {
  let sparkScene: SparkScene
  let previousViews: ViewElement
  let keysMap: KeysMap
  let activeElementKey = 'asset/0'
  const getScene = () => sparkScene
  const setScene = (scene: SparkScene) => {
    sparkScene = scene
  }
  const getViewElement = () => previousViews
  const setViewElement = (view: ViewElement) => {
    previousViews = view
  }
  const getKeysMap = () => keysMap
  const setKeysMap = (keys: KeysMap) => {
    keysMap = keys
  }
  const getActiveKey = () => activeElementKey
  const setActiveKey = (key: string) => {
    activeElementKey = key
  }
  return {
    getScene,
    setScene,
    getViewElement,
    setViewElement,
    getKeysMap,
    setKeysMap,
    getActiveKey,
    setActiveKey,
  }
}

const {
  getScene,
  setScene,
  getViewElement,
  setViewElement,
  getKeysMap,
  setKeysMap,
  getActiveKey,
  setActiveKey,
} = appState()

export {
  getScene,
  setScene,
  getViewElement,
  setViewElement,
  getKeysMap,
  setKeysMap,
  getActiveKey,
  setActiveKey,
}
