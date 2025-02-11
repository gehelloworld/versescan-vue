<script setup>
 import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import "@/styles/global.less"
</script>

<template>
  <div class="landing-page">

    <h1>
      Welcome to <br class="line-break">VerseScan
    </h1>
  
    <GoogleLoginButton />
  </div>
</template>

<style scoped lang="less">
 @import "@/styles/global.less"; 

.landing-page {
  min-height: 100vh;         
  width: 100%;               
  display: flex;             
  flex-direction: column;    
  align-items: center;       
  justify-content: center;   
  text-align: center;        
  color: #2c3e50;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  /* By default, hide the <br> element */
.line-break {
  display: none;
}

/* On small screens, show the <br>, the text breaks into two lines */
@media (max-width: 767px) {
  .line-break {
    display: block;
  }
 }
}
</style>