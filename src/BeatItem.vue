<script setup>
import { truncateText } from './util';

const { name, id } = defineProps({
    name: String,
    id: Number
})
</script>

<template>
    <button class="btn px-2 w-full bg-transparent text-gray-400 border-gray-400 hover:text-gray-900"
        @click="$emit('addBeat', id, name)">{{ truncateText(name, 35) }}</button>
</template>