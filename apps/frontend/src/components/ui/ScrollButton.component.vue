<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button 
    v-if="visible"
    type="button"
    @click="$emit('click')"
    class="scroll-button"
  >
    ↓
  </button>
</template>

<style scoped lang="less">
.scroll-button {
  font-weight: 800;
  position: fixed;
  bottom: 15rem; 
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  background-color: #99bef8;
  color: #fff;
  border: none;
  border-radius: 8px; 
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>