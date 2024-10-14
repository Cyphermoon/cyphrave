<script setup>

const { current, rowIndex, colIndex } = defineProps({
    active: Boolean,
    current: Boolean,
    rowIndex: Number,
    colIndex: Number
})
</script>

<template>
    <button @click="$emit('toggleCell', rowIndex, colIndex)" :class="{ active, current }">
    </button>
</template>


<style>
/* Add your styles here */
</style>