import {
  scene,
  view,
  image,
  DISPLAY,
  POSITION,
  FLEX_DIRECTION,
  FLEX_WRAP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  Style,
  render,
} from './render'

const viewChildren: null[] = [...Array(100 * 2)]
const childStyle: Style = {
  flexGrow: 1,
  height: 200,
  marginRight: 5,
  marginLeft: 5,
  marginTop: 5,
  marginBottom: 5,
  flexBasis: '20%',
}

const imageStyle: Style = {
  position: POSITION.POSITION_TYPE_ABSOLUTE,
  height: '100%',
  width: '100%',
}

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
      view({ fillColor: 0x00000000 }, childStyle, [
        image(
          {
            clip: true,
            mask: true,
            draw: true,
            url: 'http://localhost:8080/response.svg',
          },
          imageStyle,
          [],
        ),

        image(
          {
            url:
              'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
          },
          imageStyle,
          [],
        ),
      ]),
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
