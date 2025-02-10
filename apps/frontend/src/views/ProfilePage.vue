<template>
    <div class="test center-flex"> 
        <h1>Test</h1>
    </div>
        <!-- Divider Line -->
        <div class="divider"></div>
  
        <!-- Chat interface -->
        <div class="chat-interface-container">
          <ChatInterface />
        </div>
      <!-- </div>
    </div> -->
  </template>
  
  <script lang="ts" setup>
  import { watch } from 'vue';
  import ChatInterface from '@/components/ChatInterface.vue';

  

  </script>
  
  <style lang="less" scoped>

  .test {
    height: 100vh;
    color: #ce1212;
  }
  </style>