import * as THREE from 'three';
import { createCamera } from "./Components/camera";
import { createRenderer } from "./System/renderer";
import { createScene } from "./Components/scene";
import { Loop } from "./System/Loop";
import { Resizer } from "./System/Resizer";
import { createOrbitControls } from "./Components/OrbitController";
import { BasicShaderMat } from "./Shaders/BasicShader";
import { Mesh, SphereGeometry, TextureLoader, ShaderMaterial, Color } from 'three';

const vertexShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  uniform float u_maxExtrusion;

  void main() {
    vec3 newPosition = position;
    if (u_maxExtrusion > 1.0) {
      newPosition.xyz = newPosition.xyz * u_maxExtrusion + sin(u_time);
    } else {
      newPosition.xyz = newPosition.xyz * u_maxExtrusion;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;

  vec3 colorA = vec3(0.196, 0.631, 0.886);
  vec3 colorB = vec3(0.192, 0.384, 0.498);

  void main() {
    vec3 color = vec3(0.0);
    float pct = abs(sin(u_time));
    color = mix(colorA, colorB, pct);
    gl_FragColor = vec4(color, 1.0);
  }
`;

let renderer;
let camera;
let scene;
let loop;
let earth; // Declare earth mesh

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

    // Create a shader material with the Earth texture
    const earthMaterial = new ShaderMaterial({
      uniforms: {
        u_time: { value: .05 },
        u_maxExtrusion: { value: 1.1 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide, // Set the side to DoubleSide or FrontSide
    });

    // Create the Earth mesh
    earth = new Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Handle mouse interactions
    container.addEventListener('mousemove', this.handleMouseMove);
    container.addEventListener('mousedown', this.handleMouseDown);
    container.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(event) {
    // Handle mouse move event
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earth);

    if (intersects.length > 0) {
      // Handle mouse over the globe
      // Update shader material or perform other interactions
    }
  }

  handleMouseDown(event) {
    // Handle mouse down event
    // Modify shader material properties
  }

  handleMouseUp(event) {
    // Handle mouse up event
    // Reset shader material properties
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
