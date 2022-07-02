<script setup>
const props = defineProps({
  fluid: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 80,
  },
});

const custumSize = `width: ${props.size}%`;
</script>

<template>
  <div class="container" v-if="fluid" style="width: 100%">
    <slot />
  </div>
  <div class="container" v-else :style="custumSize">
    <slot />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
}
</style>
