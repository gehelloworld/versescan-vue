<template>
    <button
      :type="type"
      :class="['base-button', variantClass]"
    >
      <!-- Optional icon -->
      <img
        v-if="icon"
        :src="icon"
        :alt="iconAlt"
        class="icon"
      />
 
      <span><slot>{{ label }}</slot></span>
    </button>
  </template>
  
  <script lang="ts" setup>
  import { computed, defineProps } from 'vue';
  
  interface BaseButtonProps {
    type?: 'button' | 'submit' | 'reset';
    label?: string;
    icon?: string;
    iconAlt?: string;
    variant?: 'primary' | 'secondary';
  }
  
  const props = defineProps<BaseButtonProps>();
  
  /**
   * Map each variant to a custom class name defined in Less.
   */
  const variantClasses: Record<string, string> = {
    primary: 'base-button--primary',
  };
  
  /**
   * Compute the variant class based on the prop.
   */
  const variantClass = computed(() => {
    return props.variant && variantClasses[props.variant] ? variantClasses[props.variant] : '';
  });
  </script>
  
  <style lang="less" scoped>
  /* Base styles for the button */
  .base-button {
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    background-color: #ccc;  // Default background
    color: #000;           // Default text color
  
    &:hover {
      opacity: 0.8;
    }
  
    .icon {
      width: 1.25rem;   // approximately 20px
      height: 1.25rem;
      margin-right: 0.5rem; // spacing between icon and text
    }
  }
  
  /* Primary variant */
  .base-button--primary {
    background-color: #3B82F6; 
    color: #ffffff;
  
    &:hover {
      background-color: #1D4ED8; // Darker blue on hover
    }
  }
  
  </style>