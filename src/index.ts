import yoga, { Node } from 'yoga-layout'
import {
  Display,
  Position,
  OverFlow,
  AlignItems,
  JustifyContent,
  FlexDirection,
  FlexWrap,
  Style,
} from './layout'
import { initView, view } from './view'

const renderElement = (scene, parent, nodeObject) => {
  const { node } = nodeObject
  const { left, top, width, height } = node.getComputedLayout()
  console.log('here', JSON.stringify({ left, top, width, height }))
  const element = scene.create({
    t: 'rect',
    parent,
    y: top,
    x: left,
    w: width,
    h: height,
    fillColor: 0x00000070,
  })
  console.log('rendered')
  return { element, ...nodeObject }
}

const recursivelyRenderNodes = (scene, parent, data) => {
  parent = renderElement(scene, parent, data)
  return {
    ...parent,
    children: data.children.map(child =>
      recursivelyRenderNodes(scene, parent.element, child),
    ),
  }
}

px.import('px:scene.1.js').then(function ready(scene) {
  const viewChildren: Array<null> = [...Array(12)]
  const childStyle: Style = {
    flexGrow: 1,
    height: 200,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    flexBasis: '20%',
    justifyContent: JustifyContent.Center,
    alignItems: AlignItems.Center,
  }
  const views = view(
    {
      display: Display.Flex,
      flexDirection: FlexDirection.Row,
      flexWrap: FlexWrap.Wrap,
      width: 1000,
      height: 800,
    },
    viewChildren.map(() =>
      view(childStyle, [view({ height: 10, width: 10 }, [])]),
    ),
  )

  const { left, top, width, height } = initView(views.node, scene)
  const viewsWithElements = recursivelyRenderNodes(scene, scene.root, views)
  console.log('here', JSON.stringify(viewsWithElements, null, 4))
  /*

  children.map(child => {
    const { left, top, width, height } = child.getComputedLayout()
    console.log('here', JSON.stringify({left, top, width, height}))
    scene.create({
      t: "rect",
      parent: scene.root,
      y: top,
      x: left,
      w: width,
      h: height,
      fillColor: 0x00000072
    })
  })
  */
  scene.on('onClose', function(e) {
    console.log('Coverflowtest got OnClose')
  })
})
