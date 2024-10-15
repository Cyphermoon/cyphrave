<script setup>

const { title, imageSrc, link } = defineProps({
    title: String,
    imageSrc: String,
    link: String
})

</script>

<template>
    <div class="card bg-blur-xl w-96 shadow-md shadow-gray-500 flex flex-col items-center p-4 space-y-3">
        <h2 class="font-bold text-2xl">{{ title }}</h2>
        <img :src="imageSrc" :alt="`${title} Image`" class="w-full h-52 object-cover" />
        <RouterLink :to="link" class="btn btn-wide btn-accent">Go to game</RouterLink>
    </div>
</template>