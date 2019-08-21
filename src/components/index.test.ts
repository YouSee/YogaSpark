import { Node } from 'yoga-layout'
import { Style } from '../yoga/types'
import { ViewElement, Props } from './types'
import { SparkObjectTypes } from '../spark/types'
import { scene, view, image, text, container } from '.'

const getViewElement = (
  type: SparkObjectTypes,
  style: Style,
  props: Props,
): ViewElement => ({
  type,
  node: Node.create(),
  props,
  style,
  children: [],
})
test('Should call render function with state hooks getState and setState', () => {
  const viewElement: ViewElement = container(
    'myTestKey',
    (getState, setState) => {
      setState({ height: 10, width: 10, left: 0, top: 0, right: 0, bottom: 0 })
      return view({}, { top: getState().height, bottom: getState().width }, [])
    },
  )
  expect(viewElement).toEqual(
    getViewElement(SparkObjectTypes.Rect, { top: 10, bottom: 10 }, {}),
  )
})
test('Should return ViewElement for scene', () => {
  const style: Style = { width: 666 }

  expect(scene(style, { mask: true }, [])).toEqual(
    getViewElement(SparkObjectTypes.Scene, style, { mask: true }),
  )
})

test('Should return ViewElement for rect', () => {
  const style: Style = { width: 666 }
  const props: Props = { fillColor: '#fff' }

  expect(view(props, style, [])).toEqual(
    getViewElement(SparkObjectTypes.Rect, style, props),
  )
})

test('Should return ViewElement for image', () => {
  const style: Style = { width: 666 }
  const props: Props = { url: 'someImageUrl' }

  expect(image(props, style, [])).toEqual(
    getViewElement(SparkObjectTypes.Image, style, props),
  )
})

test('Should return ViewElement for text', () => {
  const style: Style = { width: 666 }
  const props: Props = { text: 'some text...' }

  expect(text(props, style, [])).toEqual(
    getViewElement(SparkObjectTypes.TextBox, style, props),
  )
})
