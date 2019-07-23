import {
  scene,
  DISPLAY,
  FLEX_DIRECTION,
  FLEX_WRAP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  render,
} from '../../src'
import { roundedImage } from './components/roundedImage'

const viewChildren: null[] = [...Array(100 * 2)]

const grid = (top: number, isOdd: boolean) =>
  scene(
    {
      display: DISPLAY.DISPLAY_FLEX,
      flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_ROW,
      flexWrap: FLEX_WRAP.WRAP_WRAP,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      top,
    },
    viewChildren.map(() =>
      roundedImage(
        'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
      ),
    ),
  )

let newTop = 0
let isOdd = true
setInterval(() => {
  render(grid(newTop, isOdd))
  newTop -= 210
  if (isOdd) isOdd = false
  else isOdd = true
}, 2000)
