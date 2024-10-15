<script setup>
import { sanitizeBeatName, truncateText } from '@/util';


const { sounds } = defineProps({
    sounds: Array
})

</script>

<template>

    <div class="w-[150px] min-h-12 mb-3.5 flex flex-row relative cursor-pointer" v-for="(sound, soundIndex) in sounds"
        :key="soundIndex" @click="$emit('deleteBeat', sound)">
        <button
            class="btn-sm whitespace-nowrap text-center px-0 w-full transform duration-300 hover:scale-95 bg-[#db6724]/60 rounded-lg flex items-center justify-evenly">
            <span class="text-black text-xl">&times;</span>
            <span class="">{{ truncateText(sanitizeBeatName(sound, false), 15) }}</span>
        </button>
    </div>
</template>