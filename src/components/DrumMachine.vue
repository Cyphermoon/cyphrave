<script setup>
import { useAudioService } from '@/useAudioService';
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import DrumCell from './DrumCell.vue';

const soundMap = {
    brassHit: '/audio/brasshit.wav',
    baseline: 'https://cdn.freesound.org/previews/135/135418_2415245-lq.mp3',
    hitHat: 'https://cdn.freesound.org/previews/38/38404_382028-lq.mp3',
    kickdrum: '/audio/kickdrum.wav'
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


<!-- DrumMachine.vue -->
<template>
    <div class="drum-machine">
        <section class="flex">
            <div class="flex flex-col space-y-3">
                <span v-for="(sound, soundIndex) in sounds" :key="soundIndex">
                    {{ sound }}
                </span>
            </div>

            <div>
                <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
                    <DrumCell v-for="(cell, colIndex) in row" :key="colIndex" :active="cell"
                        :current="colIndex === currentBeat" :colIndex="colIndex" :rowIndex="rowIndex"
                        @toggleCell="toggleCell(rowIndex, colIndex)" />
                </div>
            </div>
        </section>

        <div class="controls">
            <button @click="togglePlay">{{ isPlaying ? 'Stop' : 'Play' }}</button>
            <input type="range" v-model="tempo" min="60" max="240" />
            <span>{{ tempo }} BPM</span>
        </div>
    </div>
</template>



<style scoped>
.drum-machine {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

button {
    width: 30px;
    height: 30px;
    margin: 2px;
    background-color: #ddd;
    border: none;
    cursor: pointer;
}

button.active {
    background-color: #4CAF50;
}

button.current {
    border: 2px solid #1976D2;
}

.controls {
    margin-top: 20px;
}
</style>