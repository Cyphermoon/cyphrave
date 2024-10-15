<template>
    <!-- UI Elements -->
    <div class="shape w-32 h-32 top-10 left-10"></div>
    <div class="shape w-32 h-32 top-10 right-[20%]"></div>
    <img class="absolute w-[400px] h-[400px] top-[50%] -translate-y-1/2 left-20"
        src='https://i.postimg.cc/6yQ8s1gC/home-tree1.png left-0' alt='home-tree1' />

    <img class="absolute w-[400px] h-[400px] top-[35%] right-28" src="https://i.postimg.cc/TwdHzj3f/home-tree2.png"
        alt='home-tree2'>
</template>

<style scoped>
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