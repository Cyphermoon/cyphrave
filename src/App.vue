<script setup>
import { ref, watch } from 'vue';
import DrumMachine from './components/DrumMachine.vue';
import { fetchData, sanitizeBeatName } from './util';
import BeatItem from './BeatItem.vue';

const soundMap = ref({
  brass_hit: new Audio('/audio/brasshit.wav',),
  baseline: new Audio('https://cdn.freesound.org/previews/135/135418_2415245-lq.mp3'),
  hit_hat: new Audio('https://cdn.freesound.org/previews/38/38404_382028-lq.mp3'),
  kick_drum: new Audio('/audio/kickdrum.wav')
})
const beats = ref({})
const query = ref("piano")

const apiKey = import.meta.env["VITE_FREE_SOUND_API_KEY"]
let timeout = null


async function addBeat(id, name) {
  name = sanitizeBeatName(name)

  if (!soundMap.value[name]) {
    const beatUrl = `https://freesound.org/apiv2/sounds/${id}/?fields=previews&token=${apiKey}`
    const res = await fetchData(beatUrl)
    soundMap.value[name] = new Audio(res.previews["preview-hq-mp3"])

  } else {
    console.log("Beat already exists")
  }

}

function deleteBeat(name) {
  console.log("Deleting beat", name)
  delete soundMap.value[name]
}

// request for data on first load and after the search query changes
watch(query, async (newQuery) => {
  if (newQuery.trim() === "") return
  clearTimeout(timeout)

  const soundUrl = `https://freesound.org/apiv2/search/text/?query=${query.value}&token=${apiKey}`

  // Debounce fetch function after the first try

  timeout = setTimeout(async () => {
    beats.value = await fetchData(soundUrl)
  }, 2000)

}, { immediate: true })

</script>

<template>
  <main class="relative py-3 px-4 bg-[hsl(22,8%,6%)] w-screen min-h-screen text-slate-200 flex flex-col items-center">
    <h1 class="text-6xl text-center text-[#db6724] font-bold mt-7 mb-10">CyphRave</h1>

    <!-- UI Elements -->
    <div class="shape w-32 h-32 top-10 left-10"></div>
    <div class="shape w-32 h-32 top-10 right-[20%]"></div>
    <img class="absolute w-[400px] h-[400px] top-[50%] -translate-y-1/2 left-20"
      src='https://i.postimg.cc/6yQ8s1gC/home-tree1.png left-0' alt='home-tree1' />

    <img class="absolute w-[400px] h-[400px] top-[35%] right-28" src="https://i.postimg.cc/TwdHzj3f/home-tree2.png"
      alt='home-tree2'>


    <section class="mb-20">
      <DrumMachine :soundMap="soundMap" @deleteBeat="deleteBeat" />
    </section>


    <section class="flex flex-col items-center space-y-10">
      <input type="text" v-model="query" placeholder="Search for beats"
        class="input input-bordered text-gray-600 w-full max-w-xs" />

      <div class="grid grid-cols-4 gap-2.5">
        <BeatItem v-for="beat in beats.results" :key="beat.id" :name="beat.name" :id="beat.id" @addBeat="addBeat" />
      </div>
    </section>

  </main>


</template>

<style scoped>
@font-face {
  font-family: 'blood';
  src: url('/BloodytypepersonaluseBold-OVe6e.otf') format('truetype'),
}

h1 {
  font-family: 'blood', 'Arial';
}

.shape {
  position: absolute;
  background-color: hsl(22, 72%, 50%);
  border-radius: 50%;
  filter: blur(96px);
  z-index: 10;
}

.shape-bg {
  position: fixed;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  mix-blend-mode: soft-light;
  opacity: .5;
}
</style>
