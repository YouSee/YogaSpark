import {
  Display,
  AlignItems,
  JustifyContent,
  FlexDirection,
  FlexWrap,
  Style,
} from './layout'
import { initView, WINDOW_WIDTH, WINDOW_HEIGHT } from './yoga'
import { scene as createScene, view, image } from './components'

px.import('px:scene.1.js').then(function ready(scene) {
  const viewChildren: Array<null> = [...Array(100 * 2)]
  const childStyle: Style = {
    flexGrow: 1,
    height: 200,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    flexBasis: '20%',
    justifyContent: JustifyContent.Center,
    alignItems: AlignItems.Center,
  }

  let views = { element: false }
  setInterval(() => {
    views = initView(
      {
        element: views.element,
        ...createScene(
          {
            display: Display.Flex,
            flexDirection: FlexDirection.Row,
            flexWrap: FlexWrap.Wrap,
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
              [view({ height: 10, width: 10 }, [])],
            ),
          ),
        ),
      },
      scene,
    )
  }, 5000)

  scene.on('onClose', function(e) {
    console.log('Coverflowtest got OnClose')
  })
})
