<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'

const { initAuth, handleOAuthCallback } = useAuth()

onMounted(async () => {
  await initAuth()
  
  await handleOAuthCallback()
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  height: 100%;
}

body::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

html {
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  position: relative;
}

.main-content {
  padding-top: 0; 
  min-height: 100vh;
  background: #FFFFFF; 
  position: relative;
}


</style>
