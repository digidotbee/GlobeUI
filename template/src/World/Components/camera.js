import {  PerspectiveCamera } from "three";



function createCamera(container) {

  const fov = 33; // AKA Field of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.5; // the near clipping plane
  const far = 1000; // the far clipping plane

  const camera = new PerspectiveCamera(fov, aspect, near, far);

  // move the camera back so we can view the scene
  camera.position.set(0,0,25);

  return camera;
}

export {  createCamera };

