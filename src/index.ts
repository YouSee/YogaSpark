import yoga, { Node } from 'yoga-layout'
import { Position, OverFlow, AlignItems, JustifyContent, FlexDirection, FlexWrap, Style } from './layout'
import { initView, view } from './view'

px.import("px:scene.1.js").then(function ready(scene) {
  const rootView = view({
    flexDirection: FlexDirection.Row,
    justifyContent: JustifyContent.Center,
    alignItems: AlignItems.Center,
    width: 500,
    height: 200,
  }, [
      view({ height: 50, width: 50 }, []),
      view({ height: 50, width: 40 }, [
        view({ height: 50, width: 40 }, [])
      ])]
  )

  console.log('rootview', rootView)

  const { left, top, width, height } = initView(rootView, scene)

  console.log('here', left, top, width, height)
  scene.create({
    t: "rect",
    parent: scene.root,
    y: left,
    x: top,
    w: width,
    h: height,
    fillColor: 0x00000070
  })

  scene.on("onClose", function (e) {
    console.log("Coverflowtest got OnClose");
  });
});