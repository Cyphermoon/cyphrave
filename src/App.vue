<script setup>
import { ref, watch } from 'vue';
import DrumMachine from './components/DrumMachine.vue';
import UIElements from './components/UIElements.vue';
import { fetchData, sanitizeBeatName } from './util';
import BeatsFilterSection from './components/BeatsFilterSection.vue';

const soundMap = ref({
  brass_hit: new Audio('/audio/brasshit.wav',),
  hit_hat: new Audio('https://cdn.freesound.org/previews/38/38404_382028-lq.mp3'),
  kick_drum: new Audio('/audio/kickdrum.wav')
})
const beatsRequested = ref({})
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
  delete soundMap.value[name]
}

// request for data on first load and after the search query changes
watch(query, async (newQuery) => {
  if (newQuery.trim() === "") return
  clearTimeout(timeout)

  const soundUrl = `https://freesound.org/apiv2/search/text/?query=${query.value}&token=${apiKey}`

  timeout = setTimeout(async () => {
    beatsRequested.value = await fetchData(soundUrl)
  }, 2000)

}, { immediate: true })

</script>

<template>
  <main class="relative py-3 px-4 bg-[hsl(22,8%,6%)] w-screen min-h-screen text-slate-200 flex flex-col items-center">
    <h1 class="text-6xl text-center text-[#db6724] font-bold mt-7 mb-10">CyphRave</h1>

    <UIElements />

    <section class="mb-20">
      <DrumMachine :soundMap="soundMap" @deleteBeat="deleteBeat" />
    </section>


    <section class="flex flex-col items-center space-y-10 z-10">
      <BeatsFilterSection :beats="beatsRequested" @addBeat="addBeat" v-model:query="query" />
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
</style>
