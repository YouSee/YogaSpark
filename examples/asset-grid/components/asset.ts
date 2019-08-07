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
} from '../../../src'
import { font } from '../constants'
import { store } from '../store'
import { roundedImage } from './roundedImage'

const childStyle = (isActive: boolean): Style => ({
  flexGrow: 1,
  height: 250,
  ...(isActive
    ? { marginRight: 5, marginLeft: 5, marginTop: 2 }
    : { marginRight: 5, marginLeft: 5, marginTop: 5 }),
  marginBottom: 5,
  flexBasis: '20%',
})

const assetText = (title: string, subtitle: string, counter: string) =>
  view(
    { fillColor: 0x00000000 },
    {
      display: DISPLAY.DISPLAY_FLEX,
      flexDirection: FLEX_DIRECTION.FLEX_DIRECTION_COLUMN,
      justifyContent: JUSTIFY_CONTENT.JUSTIFY_FLEX_START,
      alignItems: ALIGN.ALIGN_FLEX_START,
      height: '20%',
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
      [roundedImage(url, isActive), assetText(title, subtitle, counter)],
    )
  })
}
