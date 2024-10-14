<script setup>
import DrumMachine from './components/DrumMachine.vue';


</script>

<template>
  <main class="py-3 px-4 bg-gray-900 w-screen h-screen text-slate-200">
    <h1 class="text-6xl text-center text-yellow-700 font-bold">CyphRave</h1>

    <DrumMachine />

  </main>
</template>

<style scoped>
@font-face {
  font-family: 'blood';
  src: url('/BloodytypepersonaluseBold-OVe6e.otf') format('truetype'),
}

h1 {
  font-family: 'blood', 'Arial';
}
</style>
