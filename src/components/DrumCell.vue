<script setup>

const { active, current } = defineProps({
    active: Boolean,
    current: Boolean,
})
</script>

<template>
    <button type="checkbox"
        :class="`btn w-12 h-12 transition duration-75 border-[#db6724] ${current && 'shadow-md shadow-black scale-95'} ${active ? 'bg-gray-400/80 scale-95 border-transparent' : 'bg-[#db6724]/20'}`"
        @click="$emit('toggleCell')" />
</template>