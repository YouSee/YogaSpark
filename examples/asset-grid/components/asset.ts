import {
  view,
  text,
  Style,
  container,
  DISPLAY,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
  ALIGN,
  SparkAlignVertical,
  POSITION,
} from '../../../src'
import { font } from '../constants'
import { store } from '../store'
import { roundedImage } from './roundedImage'

const childStyle = (isActive: boolean): Style => ({
  position: POSITION.POSITION_TYPE_RELATIVE,
  flexGrow: 1,
  height: isActive ? 260 : 250,
  ...(isActive
    ? { paddingRight: 10, paddingLeft: 10 }
    : { paddingRight: 20, paddingLeft: 20 }),
  marginBottom: 100,
  width: '25%',
})

const assetText = (title: string, subtitle: string, counter: string) =>
  view(
    { fillColor: 0x00000000 },
    {
      position: POSITION.POSITION_TYPE_ABSOLUTE,
      bottom: 10,
      left: 5,
      right: 5,
      height: 50,
      display: DISPLAY.DISPLAY_FLEX,
      flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_COLUMN,
      justifyContent: JUSTIFY_CONTENT.JUSTIFY_SPACE_BETWEEN,
      alignItems: ALIGN.ALIGN_FLEX_START,
    },
    [
      text(
        {
          fontUrl: font,
          text: `${title}/${counter}`,
          pixelSize: 20,
          alignVertical: SparkAlignVertical.CENTER,
          textColor: '#ffffff',
        },
        { height: '60%', width: '100%' },
        [],
      ),
      text(
        {
          textColor: '#aaaaaa',
          fontUrl: font,
          text: subtitle,
          pixelSize: 15,
          alignVertical: SparkAlignVertical.CENTER,
        },
        { height: '40%', width: '100%', paddingTop: 10 },
        [],
      ),
    ],
  )

export const asset = (
  counter: string,
  url: string,
  title: string,
  subtitle: string,
  index: number,
  activeElementKey: string,
) => {
  const key = `roundedImage/${index}`
  return container(key, (_getState, setState) => {
    const isActive = key === activeElementKey
    return view(
      {
        fillColor: 0x00000000,
        selectable: true,
        key,
        onRef: nodeLayout => {
          setState(nodeLayout)
        },
        onClick: () =>
          store.dispatch({ type: index % 2 === 0 ? 'INCREMENT' : 'DECREMENT' }),
      },
      childStyle(isActive),
      [assetText(title, subtitle, counter), roundedImage(url, isActive)],
    )
  })
}
