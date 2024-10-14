<script setup>
import { useAudioService } from '@/useAudioService';
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import DrumCell from './DrumCell.vue';
import DrumControl from './DrumControl.vue';

const soundMap = {
    brass_hit: '/audio/brasshit.wav',
    baseline: 'https://cdn.freesound.org/previews/135/135418_2415245-lq.mp3',
    hit_hat: 'https://cdn.freesound.org/previews/38/38404_382028-lq.mp3',
    kick_drum: '/audio/kickdrum.wav'
};

const { row, col } = { row: 4, col: 10 }

const audioService = useAudioService();
const grid = reactive(Array(row).fill().map(() => Array(col).fill(false)));
const isPlaying = ref(false);
const tempo = ref(120);
const currentBeat = ref(0);

// create an array of sounds
const sounds = Object.keys(soundMap)

let intervalId = null;

const toggleCell = (row, col) => {
    grid[row][col] = !grid[row][col];
};

const playBeat = () => {
    for (let i = 0; i < 4; i++) {
        if (grid[i][currentBeat.value]) {
            audioService.playSound(sounds[i]);
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


onMounted(() => {
    // upload the sound map
    audioService.loadSound(soundMap);

});

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
                <div class="w-full h-12 mb-3.5 flex flex-col justify-center" v-for="(sound, soundIndex) in sounds"
                    :key="soundIndex">
                    <button class="btn-sm transform duration-300 hover:scale-95 bg-[#db6724]/60 rounded-lg px-10">
                        {{ sound.replace("_", " ").toLowerCase() }}
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