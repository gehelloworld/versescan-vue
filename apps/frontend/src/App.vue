<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import './styles/global.less'

</script>

<template>
  <header>
   
    <div class="wrapper">
      <LandingPage  />
    </div>
  </header>

  <RouterView />
</template>
