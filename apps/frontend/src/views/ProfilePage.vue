<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserProfileStore } from '@/stores/useProfile.store';
import ChatInterface from '@/views/ChatInterface.vue';

const userStore = useUserProfileStore();

// Fetch the profile when the component is mounted.
onMounted(async () => {
  await userStore.fetchProfile();
});

const profileImage = new URL('@/assets/images/profile-img.png', import.meta.url).href;
</script>

<template>
    <div class="profile-page">
      <!-- Show loading indicator -->
      <div v-if="userStore.isLoading" class="status-message">
        Loading...
      </div>
  
      <!-- Show error message if present -->
      <div v-else-if="userStore.error" class="status-message">
        Error fetching profile data: {{ userStore.error }}
      </div>
  
      <!-- Main content when profile is available -->
      <div v-else class="profile-container column-flex">
        <!-- Profile header: image and greeting -->
        <div class="profile-header column-flex">
          <div class="profile-image-container">
            <img
              :src="userStore.profile?.profilePicture"
              :alt="profileImage"
              class="profile-image"
            />
          </div>
          <h1 class="profile-greeting">Hello, {{ userStore.profile?.firstName }}</h1>
        </div>
  
        <!-- Divider line -->
        <div class="divider"></div>
  
        <!-- Chat interface area -->
        <div class="chat-interface-container">
          <ChatInterface />
        </div>
      </div>
    </div>
  </template>
  
  <style lang="less" scoped>
  .profile-page {
    min-height: 100vh;
    background-color: #eef2f5; 
    align-items: center;
    justify-content: center;
    padding: 1rem; 
  }
  
  .status-message {
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
  }
  
  .profile-container {
    width: 100%;
    max-width: 56rem; // Equivalent to Tailwind max-w-4xl (~56rem)
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05); // Similar to shadow-lg
    border-radius: 0.5rem; // rounded-lg
    height: 90vh;
    padding: 1rem; // p-8 (2rem)
    gap: 0.5rem; // space-y-6 (~1.5rem)
  }
  
  .profile-header {
    align-items: center;
    gap: 0.3rem;
  }
  
  .profile-image-container {
    width: 6rem; 
    height: 6rem; 
    border-radius: 50%;
    overflow: hidden;
    background-color: #d1d5db;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
  
  .divider {
    width: 100%;
    height: 0.2rem;
    background-color: #e5e7eb; 
  }
  
  .chat-interface-container {
    flex-grow: 1;
    overflow: auto;
  }
  </style>