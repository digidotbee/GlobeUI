<template>
  <div class="home">
    <base-canvas></base-canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCanvas from '@/components/BaseCanvas.vue'

export default {
  name: 'HomeView',
  components: {
    BaseCanvas
  }
}
</script>

