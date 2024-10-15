<script setup>
import GameCard from '@/components/GameCard.vue';


</script>
<template>
    <div class="flex flex-col items-center">
        <div class="text-center mb-12 mt-8">
            <h1 class="text-6xl font-bold text-[#db6724] ">Welcome to the Game Hub</h1>
            <p>Enjoy your games</p>
        </div>

        <section class="flex flex-row justify-center space-x-4">
            <GameCard :title="'Drum Machine'" :link="'/drum_maker'"
                :imageSrc="`http://billgx.com/wp-content/uploads/2019/01/Screen-Shot-2019-01-25-at-5.32.55-AM.png`" />

            <GameCard :title="'Card Game'" :link="'/card_game'"
                :imageSrc="`https://images.unsplash.com/photo-1541278107931-e006523892df?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`" />

        </section>
    </div>


</template>