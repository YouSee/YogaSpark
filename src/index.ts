import {
  scene,
  view,
  image,
  text,
  JUSTIFY_CONTENT,
  ALIGN,
  DISPLAY,
  FLEX_DIRECTION,
  FLEX_WRAP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  Style,
  render,
} from './render'

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
      image(
        {
          url:
            'https://scaled.yousee.tv/web?url=https%3A%2F%2Fimages.yousee.tv%2Fpics%2F179583726%2F1920x1080.jpg&width=1280&height=720',
        },
        childStyle,
        [
          view(
            { fillColor: isOdd ? 'Red' : 'Green' },
            {
              ...(isOdd ? { height: 100 } : { height: 150 }),
              width: 100,
              justifyContent: JUSTIFY_CONTENT.JUSTIFY_CENTER,
              alignItems: ALIGN.ALIGN_CENTER,
            },
            top !== -210 ? [text({ text: isOdd ? 'hej' : 'nej' }, {}, [])] : [],
          ),
        ],
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
