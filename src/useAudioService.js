// useAudioService.js
import { ref } from 'vue';

export function useAudioService() {
    const sounds = ref({});

    const loadSound = (soundMap) => {
        for (let key in soundMap) {
            sounds.value[key] = new Audio(soundMap[key])
        }
    };

    const playSound = (name) => {
        if (sounds.value[name]) {
            sounds.value[name].currentTime = 0; // Reset to start
            sounds.value[name].play();
        }
    };

    return {
        loadSound,
        playSound,
    };
}