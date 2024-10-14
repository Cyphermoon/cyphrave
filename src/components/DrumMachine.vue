<script setup>
import { useAudioService } from '@/useAudioService';
import { sanitizeBeatName, truncateText } from '@/util';
import { computed, onUnmounted, ref, watch } from 'vue';
import DrumCell from './DrumCell.vue';
import DrumControl from './DrumControl.vue';

const { soundMap } = defineProps({
    soundMap: Object
})


const audioService = useAudioService(soundMap);
const isPlaying = ref(false);
const tempo = ref(120);
const currentBeat = ref(0);

// create an array of sounds
const sounds = computed(() => Object.keys(soundMap))
const col = 10
const grid = ref(generateGrid(sounds.value.length, col))

let intervalId = null;

// Change the grid when the sounds array changes
watch(sounds, () => {
    grid.value = generateGrid(sounds.value.length, col)
});

const toggleCell = (row, col) => {
    grid.value[row][col] = !grid.value[row][col];
};

function generateGrid(rows, cols) {
    return Array(rows).fill().map(() => Array(cols).fill(false));
}

const playBeat = () => {
    for (let i = 0; i < sounds.value.length; i++) {
        if (grid.value[i][currentBeat.value]) {
            audioService.playSound(sounds.value[i]);
        }
    }
    currentBeat.value = (currentBeat.value + 1) % col;
};

const play = () => {
    const minutesPerMilliseconds = 60 * 1000
    const beatDuration = minutesPerMilliseconds / tempo.value / 4;
    intervalId = setInterval(playBeat, beatDuration);
};

const stop = () => {
    clearInterval(intervalId);
    currentBeat.value = 0;
};

const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        play();
    } else {
        stop();
    }
};


watch(tempo, () => {
    if (isPlaying.value) {
        stop();
        play();
    }
});

onUnmounted(() => {
    stop();
});
</script>


<template>
    <div class="bg-[#db6724]/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-2.5">
        <DrumControl v-model="tempo" @togglePlay="togglePlay" :isPlaying="isPlaying" />
        <section class="flex relative">
            <div class="flex flex-col absolute -left-20">
                <div class="w-[150px] min-h-12 mb-3.5 flex flex-col justify-center"
                    v-for="(sound, soundIndex) in sounds" :key="soundIndex">
                    <button
                        class="btn-sm whitespace-nowrap text-center px-0 w-full transform duration-300 hover:scale-95 bg-[#db6724]/60 rounded-lg">
                        {{ truncateText(sanitizeBeatName(sound, false), 15) }}
                    </button>
                </div>
            </div>


            <div class="ml-20">
                <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row space-x-2 mb-2">
                    <DrumCell v-for="(cell, colIndex) in row" :key="colIndex" :active="cell"
                        :current="colIndex === currentBeat" :colIndex="colIndex" :rowIndex="rowIndex"
                        @toggleCell="toggleCell(rowIndex, colIndex)" />
                </div>
            </div>
        </section>
    </div>
</template>



<style scoped></style>