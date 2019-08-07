import {
  view,
  image,
  text,
  container,
  ViewElement,
  POSITION,
  Style,
  DISPLAY,
  JUSTIFY_CONTENT,
  ALIGN,
} from '../../../src'
import { roundedRect } from '../constants'
import { store } from '../store'

const childStyle = (isActive: boolean): Style => ({
  flexGrow: 1,
  height: 200,
  ...(isActive
    ? { marginRight: 5, marginLeft: 5, marginTop: 2 }
    : { marginRight: 5, marginLeft: 5, marginTop: 5 }),
  marginBottom: 5,
  flexBasis: '20%',
})

const imageStyle: Style = {
  position: POSITION.POSITION_TYPE_ABSOLUTE,
  height: '100%',
  width: '100%',
  display: DISPLAY.DISPLAY_FLEX,
  justifyContent: JUSTIFY_CONTENT.JUSTIFY_CENTER,
  alignItems: ALIGN.ALIGN_CENTER,
}

export const roundedImage = (
  counter: string,
  url: string,
  index: number,
  activeElementKey: string,
): ViewElement => {
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
      [
        image(
          {
            clip: true,
            mask: true,
            draw: true,
            url: roundedRect,
          },
          imageStyle,
          [],
        ),
        image(
          {
            ...(isActive ? { a: 0.5 } : { a: 1 }),
            url,
          },
          imageStyle,
          [text({ text: counter }, { width: 10, height: 10 }, [])],
        ),
      ],
    )
  })
}
