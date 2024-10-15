<script setup>
import { RouterView } from 'vue-router';
import UIElements from './components/UIElements.vue';


</script>

<template>
  <main class="relative py-3 px-4 bg-[hsl(22,8%,6%)] w-screen min-h-screen text-slate-200">
    <UIElements />
    <RouterView />
  </main>
</template>