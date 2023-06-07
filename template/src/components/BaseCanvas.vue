<template>
  <div class="base-canvas-body">
    <div id="scene-container">
    </div>
  </div>
</template>

<script>
import { World } from '@/World/World'
export default {
  name: 'BaseCanvas',
  mounted() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    world.start();
  }
}
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
