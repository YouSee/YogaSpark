export const renderElement = (scene, parent, nodeObject) => {
  let { type, props, node, element } = nodeObject

  const { left, top, width, height } = node.getComputedLayout()

  if (!element) {
    element = scene.create({
      t: type,
      ...props,
      parent,
      y: top,
      x: left,
      w: width,
      h: height,
      stretchX: scene.stretch.STRETCH,
      stretchY: scene.stretch.STRETCH,
      fillColor: 0x00000070,
    })
  } else {
    element.animateTo(
      { y: element.y - 210 },
      1,
      scene.animation.EASE_OUT_ELASTIC,
    )
  }

  return { ...nodeObject, element }
}

export const recursivelyRenderNodes = (scene, parent, data) => {
  parent = renderElement(scene, parent, data)
  return {
    ...parent,
    children: data.children.map(child =>
      recursivelyRenderNodes(scene, parent.element, child),
    ),
  }
}
