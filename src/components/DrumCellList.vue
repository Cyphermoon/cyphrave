<script setup>
import DrumCell from './DrumCell.vue';


const { grid, currentBeat } = defineProps({
    grid: Array,
    currentBeat: Number,
})

</script>

<template>
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row space-x-2 mb-2">
        <DrumCell v-for="(cell, colIndex) in row" :key="colIndex" :active="cell" :current="colIndex === currentBeat"
            :colIndex="colIndex" :rowIndex="rowIndex" @toggleCell="$emit('toggleCell', rowIndex, colIndex)" />
    </div>

</template>