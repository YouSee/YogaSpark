import { view, image, ViewElement, POSITION, Style } from '../../../src'

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

export const roundedImage = (
  url: string,
  index: number,
  activeElementKey: string,
): ViewElement => {
  const key = `roundedImage/${index}`
  const isActive = key === activeElementKey
  return view(
    {
      fillColor: 0x00000000,
      selectable: true,
      key,
    },
    childStyle,
    [
      image(
        {
          clip: true,
          mask: true,
          draw: true,
          url: 'http://localhost:8080/rrect.svg',
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
        [],
      ),
    ],
  )
}
