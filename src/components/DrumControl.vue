<script setup>

const { isPlaying } = defineProps({
    isPlaying: Boolean
})

const tempo = defineModel('tempo')
const col = defineModel('col')

</script>

<template>

    <div class="flex justify-between mb-6">
        <button class="btn btn-sm btn-primary" @click="$emit('togglePlay')">{{ isPlaying ? 'Stop' : 'Play'
            }}</button>

        <input type="number" min="5" max="20" v-model="col" class="rounded-lg px-4 outline-amber-600 w-[50%] max-w-40">

        <div class="inline-flex items-center space-x-1">
            <input class="range range-primary" type="range" v-model="tempo" min="60" max="240" />
            <span class="text-xs font-medium whitespace-nowrap">{{ tempo }} BPM</span>
        </div>
    </div>
</template>