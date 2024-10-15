
export function useAudioService(sounds) {

    const playSound = (name) => {
        if (sounds[name]) {
            sounds[name].currentTime = 0; // Reset to start
            sounds[name].play();
        }
    };

    return {
        playSound,
    };
}