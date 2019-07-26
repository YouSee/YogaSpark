import {
  scene,
  DISPLAY,
  FLEX_DIRECTION,
  FLEX_WRAP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  render,
  ViewElement,
} from '../../src'
import { roundedImage } from './components/roundedImage'

const viewChildren: null[] = [...Array(10 * 4)]

const view = ({ top }, activeElementKey: string): ViewElement =>
  scene(
    {
      display: DISPLAY.DISPLAY_FLEX,
      flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_ROW,
      flexWrap: FLEX_WRAP.WRAP_WRAP,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      top,
    },
    viewChildren.map((_, index) =>
      roundedImage(
        'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
        index,
        activeElementKey,
      ),
    ),
  )

let newTop = 0
render(view, { top: newTop })
/*
newTop -= 210
setInterval(() => {
  render(view, { top: newTop })
  newTop -= 210
}, 2000)
*/
