<script setup lang="ts">
import { ref } from 'vue'

let isButtonTopHidden = ref(false);

document.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
        isButtonTopHidden.value = true;
    } else {
        isButtonTopHidden.value = false;
    }
})

</script>

<template>
    <a :class="{'hidden': isButtonTopHidden}" id="toTop" href="#start" class="fixed bottom-10 right-10 flex justify-center hover-jump z-10 drop-shadow-md">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1280.000000 1247.000000"
         class="absolute bottom-1/2 translate-y-1/2 fill-rose-400 w-8 h-8">
            <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g transform="translate(0.000000,1247.000000) scale(0.100000,-0.100000)"
            stroke="none">
            <path class="" d="M6175 12456 c-127 -26 -246 -77 -380 -164 -53 -35 -336 -312 -1175
            -1151 -2382 -2383 -4318 -4328 -4357 -4376 -112 -139 -190 -293 -234 -461 -19
            -72 -23 -116 -24 -234 0 -189 28 -307 111 -470 114 -224 302 -356 584 -414
            155 -31 316 -36 1283 -36 l968 0 24 -26 c14 -15 30 -43 36 -63 19 -64 25 -231
            14 -406 -6 -106 -10 -803 -10 -1860 0 -1592 1 -1696 18 -1795 107 -616 530
            -929 1337 -990 178 -13 3616 -14 3835 0 405 25 657 80 879 191 102 52 152 86
            232 162 134 125 223 289 263 482 5 28 13 64 17 80 4 17 10 950 13 2075 6 2019
            6 2045 26 2084 44 87 91 97 385 79 880 -53 1445 -66 1701 -38 395 42 657 144
            842 329 139 140 219 343 234 593 15 273 -75 517 -292 788 -73 91 -222 244
            -416 425 -84 79 -1148 1136 -2364 2349 -1215 1212 -2257 2247 -2315 2299 -331
            300 -599 466 -857 532 -103 27 -285 34 -378 16z"/>
            </g>
        </svg>
    </a>
</template>

<style>
.hover-jump:hover {
    animation-name: jump;
    animation-duration: 0.4s;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
}

@keyframes jump {
    from {
        bottom: 40px;
    }

    to {
      bottom: 60px;
    }
}
</style>