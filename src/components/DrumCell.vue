<script setup>

const { current, rowIndex, colIndex } = defineProps({
    active: Boolean,
    current: Boolean,
    rowIndex: Number,
    colIndex: Number
})
</script>

<template>
    <input type="checkbox" class="checkbox" @click="$emit('toggleCell', rowIndex, colIndex)"
        :class="{ active, current }" />
</template>


<style>
/* Add your styles here */
</style>