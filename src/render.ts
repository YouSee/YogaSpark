import { initView } from './yoga'
import { ViewElement } from './yoga/types'
import { SparkScene } from './spark/types'

declare let px: {
  import: (file: string) => Promise<SparkScene>
}

export * from './components'
export * from './spark/types'
export * from './yoga'
export * from './yoga/types'

let sparkScene: SparkScene
let previousViews: ViewElement

export const render = (views: ViewElement) => {
  // first render
  if (!sparkScene) {
    px.import('px:scene.1.js').then((scene: SparkScene) => {
      sparkScene = scene
      previousViews = initView(views, previousViews, sparkScene)
    })
  } else {
    previousViews = initView(views, previousViews, sparkScene)
  }
}
