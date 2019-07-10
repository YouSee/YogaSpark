import {
  JUSTIFY_CONTENT,
  ALIGN,
  DISPLAY,
  FLEX_DIRECTION,
  FLEX_WRAP,
  Style,
} from './yoga/types'
import { initView, WINDOW_WIDTH, WINDOW_HEIGHT, ViewElement } from './yoga'
import { SparkScene, SparkSceneEvents } from './spark/types'
import { scene as createScene, view, image, text } from './components'

px.import('px:scene.1.js').then(function ready(scene: SparkScene) {
  const viewChildren: Array<null> = [...Array(100 * 2)]
  const childStyle: Style = {
    flexGrow: 1,
    height: 200,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    flexBasis: '20%',
    justifyContent: JUSTIFY_CONTENT.JUSTIFY_CENTER,
    alignItems: ALIGN.ALIGN_CENTER,
  }

  let previousViews: ViewElement
  setInterval(() => {
    previousViews = initView(
      createScene(
        {
          display: DISPLAY.DISPLAY_FLEX,
          flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_ROW,
          flexWrap: FLEX_WRAP.WRAP_WRAP,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        },
        viewChildren.map(() =>
          image(
            {
              url:
                'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
            },
            childStyle,
            [
              view(
                { fillColor: 'Red' },
                {
                  height: 100,
                  width: 100,
                  justifyContent: JUSTIFY_CONTENT.JUSTIFY_CENTER,
                  alignItems: ALIGN.ALIGN_CENTER,
                },
                [text({ text: 'nej' }, {}, [])],
              ),
            ],
          ),
        ),
      ),
      previousViews,
      scene,
    )
  }, 5000)

  scene.on(SparkSceneEvents.OnClose, e => {
    console.log('Coverflowtest got OnClose')
  })
})
