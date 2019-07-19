import { Node } from 'yoga-layout'
import { Style, ViewElement } from '../yoga/types'
import { SparkObjectTypes } from '../spark/types'
import { scene, view, image, text } from '.'
import { Props } from './types'

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
test('Should return ViewElement for scene', () => {
  const style: Style = { width: 666 }

  expect(scene(style, [])).toEqual(
    getViewElement(SparkObjectTypes.Scene, style, {}),
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
    getViewElement(SparkObjectTypes.Text, style, props),
  )
})
