import {
  view,
  image,
  text,
  ViewElement,
  POSITION,
  Style,
  DISPLAY,
  JUSTIFY_CONTENT,
  ALIGN,
} from '../../../src'
import { roundedRect } from '../constants'

const childStyle: Style = {
  width: '100%',
  height: '80%',
}

const imageStyle: Style = {
  position: POSITION.POSITION_TYPE_ABSOLUTE,
  height: '100%',
  width: '100%',
  display: DISPLAY.DISPLAY_FLEX,
  justifyContent: JUSTIFY_CONTENT.JUSTIFY_CENTER,
  alignItems: ALIGN.ALIGN_CENTER,
}

export const roundedImage = (url: string, isActive: boolean): ViewElement =>
  view(
    {
      fillColor: 0x00000000,
    },
    childStyle,
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
          url,
        },
        imageStyle,
        [],
      ),
    ],
  )
