import {
  view,
  image,
  container,
  ViewElement,
  POSITION,
  Style,
} from '../../../src'

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
}

export const roundedImage = (
  url: string,
  index: number,
  activeElementKey: string,
): ViewElement => {
  const key = `roundedImage/${index}`
  return container(key, (getState, setState) => {
    const isActive = key === activeElementKey
    return view(
      {
        fillColor: 0x00000000,
        selectable: true,
        key,
        onRef: nodeLayout => {
          setState(nodeLayout)
        },
      },
      childStyle(isActive),
      [
        image(
          {
            clip: true,
            mask: true,
            draw: true,
            url: `${px.getPackageBaseFilePath()}/rrect.svg`,
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
  })
}
