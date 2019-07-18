import { initView, ViewElement } from './yoga'
import { SparkScene } from './spark/types'

export * from './components'
export * from './spark/types'
export * from './yoga'
export * from './yoga/types'

let scene: SparkScene
let previousViews: ViewElement

export const render = (views: ViewElement) => {
  // first render
  if (!scene) {
    px.import('px:scene.1.js').then((scene: SparkScene) => {
      scene = scene
      previousViews = initView(views, previousViews, scene)
    })
  } else {
    previousViews = initView(views, previousViews, scene)
  }
}
