<template>
  <div class="base-canvas-body">
    <div id="scene-container"></div>
  </div>
</template>

<script>
import { World } from "@/World/World";
import * as THREE from "three";

export default {
  name: "BaseCanvas",
  data() {
    return {
      world: null,
    };
  },
  mounted() {
    const container = document.querySelector("#scene-container");
    this.world = new World(container);
    this.world.start();

    // Add mouse event listeners for interaction
    container.addEventListener("mousemove", this.onMouseMove);
    container.addEventListener("mousedown", this.onMouseDown);
    container.addEventListener("mouseup", this.onMouseUp);
  },
  methods: {
    onMouseMove(event) {
      const world = this.world;
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      world.handleMouseMove(mouse);
    },
    onMouseDown() {
      const world = this.world;
      world.handleMouseDown();
    },
    onMouseUp() {
      const world = this.world;
      world.handleMouseUp();
    },
  },
  beforeDestroy() {
    // Remove event listeners when the component is destroyed
    const container = document.querySelector("#scene-container");
    container.removeEventListener("mousemove", this.onMouseMove);
    container.removeEventListener("mousedown", this.onMouseDown);
    container.removeEventListener("mouseup", this.onMouseUp);
  },
};
</script>

<style scoped>
#scene-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
}
</style>

