<script setup>
const { name } = defineProps({
    name: String
})
</script>

<template>
    <button class="btn bg-transparent text-gray-400 border-gray-400 hover:text-gray-900">{{ name }}</button>
</template>