<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.component.vue';

const props = defineProps<{
  modelValue: string,
  placeholder?: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'send'): void,
}>();

const onInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const onSend = (): void => {
  if (props.modelValue.trim().length > 0) {
    emit('send');
  }
};
</script>

<template>
  <div class="input-field">
    <input 
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @keydown.enter.prevent="onSend"
    />
    
    <BaseButton 
      type="button"
      variant="primary"
      label="Send"
      @click="onSend"
    />
  </div>
</template>

<style scoped lang="less">
.input-field {
  display: flex;
  align-items: center;
  input {
    font-size: @font-size-medium;
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    @media (max-width: 767px) {
    font-size: @font-size-base;
    }
  }
}
</style>