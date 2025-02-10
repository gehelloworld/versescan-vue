<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'; 
import googleIcon from '@/assets/icons/google-icon.png';    
</script>

<template>
    <BaseButton
      class="google-login-button"
      type="button"
      variant="primary"
      :icon="googleIcon"
      iconAlt="Google Icon"
      label="Sign in with Google"
    />
  </template>
  
  <style lang="less">
    .google-login-button span {
    font-weight: bold;
    }
  </style>