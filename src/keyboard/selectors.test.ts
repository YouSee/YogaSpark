import { ViewElement } from '../components/types'
import { Keys } from './types'
import { SparkObject } from '../spark/types'
import { findActiveElementSelector, findNewElementsSelector } from './selectors'
import { getObject } from '../spark/index.mock'
import { getViewElement } from './bounding.test'

test('Should return true if the viewElements key is the same as the active key', () => {
  const sparkObjectCurrent: SparkObject = getObject(60, 5, 50, 50)
  const myActiveKey = 'iAmActive'
  const anotherKey = 'iAmNotActive'
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
    key: myActiveKey,
  })
  expect(findActiveElementSelector(viewElement, myActiveKey)).toBeTruthy()
  expect(findActiveElementSelector(viewElement, anotherKey)).toBeFalsy()
})

test('Should return false if current element has the same x and y as the active element', () => {
  const sparkObjectCurrent: SparkObject = getObject(10, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
    selectable: true,
  })
  const activeElement: ViewElement = getViewElement(sparkObjectActive, {
    selectable: true,
  })
  expect(
    findNewElementsSelector(viewElement, activeElement, Keys.Right),
  ).toBeFalsy()
})

test('Should return false if current element is not selectable', () => {
  const sparkObjectCurrent: SparkObject = getObject(65, 5, 50, 50)
  const sparkObjectActive: SparkObject = getObject(10, 5, 50, 50)
  const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
    selectable: false,
  })
  const activeElement: ViewElement = getViewElement(sparkObjectActive, {
    selectable: true,
  })
  expect(
    findNewElementsSelector(viewElement, activeElement, Keys.Right),
  ).toBeFalsy()
})

test.each([
  [Keys.Right, 120, 60, 50, 50],
  [Keys.Left, 5, 60, 50, 50],
  [Keys.Up, 60, 5, 50, 50],
  [Keys.Down, 60, 120, 50, 50],
])(
  'Should return true if current element is in the bounding box and there is no previous element for %s key',
  (key: Keys, x: number, y: number, w: number, h: number) => {
    const sparkObjectCurrent: SparkObject = getObject(x, y, w, h)
    const sparkObjectActive: SparkObject = getObject(60, 60, 50, 50)
    const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
      selectable: true,
    })
    const activeElement: ViewElement = getViewElement(sparkObjectActive, {
      selectable: true,
    })
    expect(
      findNewElementsSelector(viewElement, activeElement, key),
    ).toBeTruthy()
  },
)

test.each([
  [Keys.Right, 5, 5, 50, 50],
  [Keys.Left, 5, 5, 50, 50],
  [Keys.Up, 5, 5, 50, 50],
  [Keys.Down, 5, 5, 50, 50],
])(
  'Should return false if current element is not in the bounding box for %s',
  (key: Keys, x: number, y: number, w: number, h: number) => {
    const sparkObjectCurrent: SparkObject = getObject(x, y, w, h)
    const sparkObjectActive: SparkObject = getObject(60, 60, 50, 50)
    const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
      selectable: true,
    })
    const activeElement: ViewElement = getViewElement(sparkObjectActive, {
      selectable: true,
    })
    expect(findNewElementsSelector(viewElement, activeElement, key)).toBeFalsy()
  },
)

test.each([
  [Keys.Right, 240, 180, 50, 50, 300, 180, 50, 50],
  [Keys.Left, 120, 180, 50, 50, 60, 180, 50, 50],
  [Keys.Up, 180, 120, 50, 50, 180, 60, 50, 50],
  [Keys.Down, 180, 240, 50, 50, 180, 300, 50, 50],
])(
  'Should return true if current element is in the bounding box for %s and closer than previous element',
  (
    key: Keys,
    x: number,
    y: number,
    w: number,
    h: number,
    previousX: number,
    previousY: number,
    previousW: number,
    previousH: number,
  ) => {
    const sparkObjectCurrent: SparkObject = getObject(x, y, w, h)
    const sparkObjectActive: SparkObject = getObject(180, 180, 50, 50)
    const sparkObjectPrevious: SparkObject = getObject(
      previousX,
      previousY,
      previousW,
      previousH,
    )
    const viewElement: ViewElement = getViewElement(sparkObjectCurrent, {
      selectable: true,
    })
    const activeElement: ViewElement = getViewElement(sparkObjectActive, {
      selectable: true,
    })
    const previousElement: ViewElement = getViewElement(sparkObjectPrevious, {
      selectable: true,
    })
    expect(
      findNewElementsSelector(viewElement, activeElement, key, previousElement),
    ).toBeTruthy()
  },
)
