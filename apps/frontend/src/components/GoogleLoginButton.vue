<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.component.vue'; 
import googleIcon from '@/assets/icons/google-icon.png';  
import { environment } from '@/environments/environment';
const {backendUrl} = environment.app;
const handleLogin = () => {
  window.location.href = `${backendUrl}/api/auth/google`;  
};
</script>

<template>
    <BaseButton
      class="google-login-button"
      type="button"
      variant="primary"
      :icon="googleIcon"
      iconAlt="Google Icon"
      label="Sign in with Google"
      @click="handleLogin"
    />
  </template>
  
  <style lang="less">
    .google-login-button span {
    font-weight: bold;
    }
  </style>