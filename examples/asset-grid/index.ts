import {
  scene,
  view,
  text,
  container,
  DISPLAY,
  FLEX_DIRECTION,
  FLEX_WRAP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  render,
  ViewElement,
  JUSTIFY_CONTENT,
  ALIGN,
  NodeLayout,
  SparkAlignHorizontal,
  SparkAlignVertical,
} from '../../src'
import { roundedImage } from './components/roundedImage'
import { store } from './store'
import { fontBold } from './constants'

const viewChildren: null[] = [...Array(40)]

const getTop = (state?: NodeLayout): number => {
  if (state && state.top > 5) return (state.top - state.height) * -1
  return 0
}

const title = title =>
  text(
    {
      fontUrl: fontBold,
      text: title,
      pixelSize: 30,
      alignHorizontal: SparkAlignHorizontal.CENTER,
      alignVertical: SparkAlignVertical.CENTER,
    },
    {
      width: '100%',
      height: '20%',
    },
    [],
  )

const app = (store, activeElementKey: string): ViewElement =>
  container(activeElementKey, getState => {
    return scene(
      {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        top: getTop(getState()),
      },
      [
        title('Action film'),
        view(
          {},
          {
            display: DISPLAY.DISPLAY_FLEX,
            flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_ROW,
            flexWrap: FLEX_WRAP.WRAP_WRAP,
            justifyContent: JUSTIFY_CONTENT.JUSTIFY_FLEX_START,
            alignItems: ALIGN.ALIGN_FLEX_START,
          },
          viewChildren.map((_, index) =>
            roundedImage(
              store,
              'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
              index,
              activeElementKey,
            ),
          ),
        ),
      ],
    )
  })

render(app, store)
