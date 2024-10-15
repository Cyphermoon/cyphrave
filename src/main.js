import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
import DrumMakerScreen from './screens/DrumMakerScreen.vue'
import MainScreen from './screens/MainScreen.vue'
import CardGameScreen from './screens/CardGameScreen.vue'


const routes = [
    { path: '/', component: MainScreen },
    { path: '/drum_maker', component: DrumMakerScreen },
    { path: '/card_game', component: CardGameScreen },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App)
    .use(router)
    .mount('#app')
