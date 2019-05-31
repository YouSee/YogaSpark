// Hot reload
px.import({ scene: 'px:scene.1.js', ws: 'ws' })
  .then(function importsAreReady(imports) {
    var root = imports.scene.root;
    const scene = imports.scene;
    var ws = imports.ws;
    const websocket = new ws('ws://localhost:5000');

    var s = scene.create({
      t: 'scene',
      parent: root,
      w: 1200,
      h: 400,
      url: 'http://localhost:3000/bundle.js'
    });
    s.focus = true;

    websocket.on('message', function incoming(data) {
      s.dispose();
      s = scene.create({
        t: 'scene',
        parent: root,
        w: 1200,
        h: 400,
        url: 'http://localhost:3000/bundle.js'
      });
      s.focus = true;
    });
  })
  .catch(function importFailed(err) {
    console.error('Imports failed for hotreload.js: ' + err);
  });
