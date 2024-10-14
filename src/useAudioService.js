// useAudioService.js

export function useAudioService(sounds) {



    const playSound = (name) => {
        console.log('playSound', name);
        console.log('sounds', sounds);
        if (sounds[name]) {
            sounds[name].currentTime = 0; // Reset to start
            sounds[name].play();
        }
    };

    return {
        playSound,
    };
}