<script setup lang="ts">
import Header from './components/Header.vue'
import MainContent from './components/MainContent.vue'
import ButtonToTop from './components/ButtonToTop.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <MainContent />
  <Footer />
  <ButtonToTop />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.ubuntu-mono-font {
  font-family: "Ubuntu Mono", monospace;
  font-style: normal;
}

:root {
  font-family: "Ubuntu Mono", monospace;
}
.hidden {
  display: none;
}
</style>
