<script setup lang="ts">
window.electron.ipcRenderer.send('message', 'Hello from App.vue!')
</script>

<template>
  <div id="app">
    hello world
  </div>
</template>
