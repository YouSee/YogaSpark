import {
  view,
  image,
  ViewElement,
  POSITION,
  Style,
  DISPLAY,
  JUSTIFY_CONTENT,
  ALIGN,
} from '../../../src'
import { roundedRect } from '../constants'

const childStyle = (isActive: boolean): Style => ({
  width: '100%',
  height: isActive ? '82%' : '80%',
})

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
    childStyle(isActive),
    [
      ...(isActive
        ? [
            view({ fillColor: 0x00000000 }, imageStyle, [
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
              view({ fillColor: '#ffffff' }, imageStyle, []),
            ]),
          ]
        : []),
      view(
        { fillColor: 0x00000000 },
        isActive
          ? {
              position: POSITION.POSITION_TYPE_ABSOLUTE,
              top: 4,
              left: 4,
              right: 4,
              bottom: 4,
            }
          : imageStyle,
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
      ),
    ],
  )
