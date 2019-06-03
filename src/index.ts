import yoga, { Node } from 'yoga-layout'
import { Display, Position, OverFlow, AlignItems, JustifyContent, FlexDirection, FlexWrap, Style } from './layout'
import { initView, view } from './view'

px.import("px:scene.1.js").then(function ready(scene) {
  const [rootView, ...children] = view({
    display: Display.Flex,
    flexDirection: FlexDirection.Row,
    //justifyContent: JustifyContent.Center,
    //alignItems: AlignItems.Center,
    width: 1000,
    height: 800,
  }, [
      view({ flexGrow: 1 }, []),
      view({ flexGrow: 1 }, []),
      view({ flexGrow: 1 }, []),
      view({ flexGrow: 1 }, []),
    ]
  )

  const { left, top, width, height } = initView(rootView, scene)

  scene.create({
    t: "rect",
    parent: scene.root,
    y: left,
    x: top,
    w: width,
    h: height,
    fillColor: 0x00000070
  })

  children.map(child => {
    const { left, top, width, height } = child.getComputedLayout()
    console.log('here', left, top, width, height)
    scene.create({
      t: "rect",
      parent: scene.root,
      y: left,
      x: top,
      w: width,
      h: height,
      fillColor: 0x00000072
    })
  })

  scene.on("onClose", function (e) {
    console.log("Coverflowtest got OnClose");
  });
});