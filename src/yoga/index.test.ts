import { Node } from 'yoga-layout'
import { createViewElement, ViewElement } from '.'
import { SparkObjectTypes } from '../spark/types'

test('Should return ViewElement object', () => {
  const viewElement: ViewElement = createViewElement(
    SparkObjectTypes.Rect,
    Node.create(),
    { url: 'hey' },
    { height: 10, width: 10 },
    [],
  )

  const expectedViewElement: ViewElement = {
    type: SparkObjectTypes.Rect,
    node: Node.create(),
    props: { url: 'hey' },
    style: { height: 10, width: 10 },
    children: [],
  }

  expect(viewElement).toEqual(expectedViewElement)
  expect({ ...viewElement, children: [viewElement] }).toEqual({
    ...expectedViewElement,
    children: [expectedViewElement],
  })
})
