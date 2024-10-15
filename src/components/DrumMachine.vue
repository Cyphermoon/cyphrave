<script setup>
import { useAudioService } from '@/useAudioService';
import { computed, onUnmounted, ref, watch } from 'vue';
import DrumCellList from './DrumCellList.vue';
import DrumControl from './DrumControl.vue';
import SelectedBeats from './SelectedBeats.vue';

const { soundMap } = defineProps({
    soundMap: Object
})

const audioService = useAudioService(soundMap);
const isPlaying = ref(false);
const tempo = ref(120);
const currentBeat = ref(0);

// create an array of sounds
const sounds = computed(() => Object.keys(soundMap))
const col = ref(10)
const grid = ref(generateGrid(sounds.value.length, col.value))

let intervalId = null;

// update the grid when sounds or col change
watch(sounds, () => {
    grid.value = generateGrid(sounds.value.length, col.value)
});

watch(col, (newCol) => {
    grid.value = generateGrid(sounds.value.length, newCol)
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
    currentBeat.value = (currentBeat.value + 1) % col.value;
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
        <DrumControl v-model:tempo="tempo" v-model:col="col" @togglePlay="togglePlay" :isPlaying="isPlaying" />

        <section class="flex relative">
            <div class="flex flex-col absolute -left-20">
                <SelectedBeats :sounds="sounds" @deleteBeat="(sound) => $emit('deleteBeat', sound)" />
            </div>

            <div v-if="grid.length > 0" class="ml-20">
                <DrumCellList :grid="grid" :currentBeat="currentBeat" @toggleCell="toggleCell" />
            </div>

            <div v-else>
                <p>Please add some beats to start mixing</p>
            </div>
        </section>
    </div>
</template>
