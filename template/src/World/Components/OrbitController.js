import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



function createOrbitControls(camera, domElement) {
    const controller = new OrbitControls(camera, domElement);
    controller.autoRotateSpeed = 1.0;
    controller.tick = (delta) => {
        controller.update();
    }

    return controller;
}





export { createOrbitControls }