<script setup>

const { isPlaying } = defineProps({
    isPlaying: Boolean
})

const model = defineModel()

</script>

<template>

    <div class="flex justify-between mb-6">
        <button class="btn btn-sm btn-primary" @click="$emit('togglePlay')">{{ isPlaying ? 'Stop' : 'Play'
            }}</button>

        <div class="inline-flex items-center space-x-1">
            <input class="range range-primary" type="range" v-model="model" min="60" max="240" />
            <span class="text-xs font-medium whitespace-nowrap">{{ model }} BPM</span>
        </div>
    </div>
</template>