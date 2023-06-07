import { createCamera } from "./Components/camera";
import { createRenderer } from "./System/renderer";
import { createScene } from "./Components/scene";
import { Loop } from "./System/Loop";
import { Resizer } from "./System/Resizer";
import { CreateBaseCube } from "./Components/StarterCube";
import { AxesHelper } from "three";



let renderer;
let camera;
let scene;
let loop;


//----------------------Settings---------------------

class World {
  constructor(container) {
    //setup basic three components
    scene = createScene();
    camera = createCamera(container);
    renderer = createRenderer();
    container.append(renderer.domElement);
    loop = new Loop(camera, scene, renderer);
    const resizer = new Resizer(container, camera, renderer);


    //Helpers
    const axesHelper = new AxesHelper(10);
    scene.add(axesHelper);

    //Scene
    const cube = CreateBaseCube();
    cube.position.set(0, 0, 0);
    scene.add(cube);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }
  stop() {
    loop.stop();
  }
}



export { World };

