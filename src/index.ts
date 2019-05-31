import moment from "moment";

px.import("px:scene.1.js").then(function ready(scene) {
  var root = scene.root;
  root.h = 1000;

  var t = scene.create({
    t: "rect",
    y: 20,
    parent: root,
    w: 200,
    h: 300,
    cx: 200 / 2,
    cy: 300 / 2,
    ry: 1,
    rz: 0,
    fillColor: 0x00000070
  });

  var dtlTitle = scene.create({
    t: "textBox",
    parent: root,
    x: 500,
    w: 500,
    h: 300,
    y: 28,
    wordWrap: true,
    pixelSize: 40,
    leading: -10,
    textColor: 0xffffffff,
    text: `hej med dig ${moment().toDate()}`
  });

  scene.on("onClose", function (e) {
    console.log("Coverflowtest got OnClose");
  });
});