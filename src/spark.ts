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

export const recursivelyRenderNodes = (scene, parent, newNode, oldNode) => {
  if (!oldNode) parent = renderElement(scene, parent, newNode)
  if (oldNode && newNode)
    parent = renderElement(scene, parent, {
      ...newNode,
      element: oldNode.element,
    })
  return {
    ...parent,
    children: newNode.children.map((child, idx) =>
      recursivelyRenderNodes(
        scene,
        parent.element,
        child,
        oldNode && oldNode.children[idx],
      ),
    ),
  }
}
