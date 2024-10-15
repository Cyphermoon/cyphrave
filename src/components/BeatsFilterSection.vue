<script setup>
import BeatItem from '@/BeatItem.vue';


const query = defineModel('query')

const { beats } = defineProps({
    beats: Object
})

</script>

<template>

    <input type="text" v-model="query" placeholder="Search for beats"
        class="input input-bordered text-gray-600 w-full max-w-xs" />

    <div v-if="beats.results" class="grid grid-cols-4 gap-2.5">
        <BeatItem v-for="beat in beats.results" :key="beat.id" :name="beat.name"
            @addBeat="$emit('addBeat', beat.id, beat.name)" />
    </div>
    <div v-else>
        <p>Loading Beats.....</p>
    </div>
</template>