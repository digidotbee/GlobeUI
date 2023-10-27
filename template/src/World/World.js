import { createCamera } from "./Components/camera";
import { createRenderer } from "./System/renderer";
import { createScene } from "./Components/scene";
import { Loop } from "./System/Loop";
import { Resizer } from "./System/Resizer";
//import { CreateBaseCube } from "./Components/StarterCube";
//import { AxesHelper } from "three";
import { createOrbitControls } from "./Components/OrbitController";
import { Mesh, SphereGeometry, TextureLoader, MeshBasicMaterial, Scene, Color, Fog } from 'three';

let renderer;
let camera;
let scene;
let loop;

class World {
  constructor(container) {
    scene = createScene();
    camera = createCamera(container);
    renderer = createRenderer();
    container.append(renderer.domElement);
    loop = new Loop(camera, scene, renderer);
    const orbitController = createOrbitControls(camera, container);
    const resizer = new Resizer(container, camera, renderer);

    // Create a sphere geometry for the Earth
    const earthGeometry = new SphereGeometry(5, 32, 32); // Adjust the radius as needed

    // Load the Earth texture map
    const earthTexture = new TextureLoader().load('../countries.webp'); // Update the path to your texture map

    // Create a material with the Earth texture
    const earthMaterial = new MeshBasicMaterial({ map: earthTexture });

    // Create the Earth mesh
    const earth = new Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Remove the cube and axesHelper
    // scene.remove(cube);
    // scene.remove(axesHelper);
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