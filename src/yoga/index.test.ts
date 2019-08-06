import { Node, YogaNode } from 'yoga-layout'
import { createViewElement, createNode, createNodeTree } from '.'
import { SparkObjectTypes } from '../spark/types'
import { Style } from './types'
import { Props, ViewElement } from '../components/types'

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

test.each([
  ['setDisplay', 'display', 1, 1],
  ['setOverflow', 'overflow', 1, 1],
  ['setAlignItems', 'alignItems', 1, 1],
  ['setJustifyContent', 'justifyContent', 1, 1],
  ['setFlexDirection', 'flexDirection', 1, 1],
  ['setFlexWrap', 'flexWrap', 1, 1],
  ['setFlexGrow', 'flexGrow', 1, 1],
  ['setFlexShrink', 'flexShrink', 1, 1],
  ['setFlexBasis', 'flexBasis', 1, 1],
  ['setPadding', 'paddingRight', 1, 2, 1],
  ['setPadding', 'paddingLeft', 1, 0, 1],
  ['setPadding', 'paddingBottom', 1, 3, 1],
  ['setPadding', 'paddingTop', 1, 1, 1],
  ['setMargin', 'marginRight', 1, 2, 1],
  ['setMargin', 'marginLeft', 1, 0, 1],
  ['setMargin', 'marginBottom', 1, 3, 1],
  ['setMargin', 'marginTop', 1, 1, 1],
  ['setHeight', 'height', 2, 2],
  ['setWidth', 'width', 2, 2],
])(
  'should call %s if %s includes Property with value %i with rest of the elements as input',
  (func, property, value, ...expectedParameters) => {
    type Mock = { [key: string]: () => void }

    const mockNodeInstance: Mock = {
      [func]: jest.fn(),
    }
    const mockNode = {
      create: () => mockNodeInstance,
    }
    createNode({ [property]: value }, mockNode)
    expect(mockNodeInstance[func]).toHaveBeenCalledWith(...expectedParameters)
  },
)

test('Should create node tree and add children to node and return view element', () => {
  const createChild = (width: number): ViewElement => {
    const node: YogaNode = Node.create()
    node.setWidth(width)
    return createViewElement(
      SparkObjectTypes.Rect,
      node,
      { url: 'hey' },
      { height: 10, width: 10 },
      [],
    )
  }

  const props: Props = { text: 'hey' }
  const style: Style = { width: 666 }
  const chilren: ViewElement[] = [createChild(1), createChild(2)]

  const tree: ViewElement = createNodeTree(
    SparkObjectTypes.Rect,
    props,
    style,
    chilren,
  )

  // yoga tree
  expect(tree.node.getChildCount()).toBe(2)
  expect(tree.node.getChild(0).getWidth().value).toBe(1)
  expect(tree.node.getChild(1).getWidth().value).toBe(2)
  expect(tree.node.getWidth().value).toBe(666)

  // view element
  expect(tree.type).toBe(SparkObjectTypes.Rect)
  expect(tree.props).toEqual(props)
  expect(tree.style).toEqual(style)
  expect(tree.children).toEqual(chilren)
  expect(tree.element).toBeUndefined()
})
