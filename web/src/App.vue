<template>
  <Navbar />

  <router-view />

  <Footer />
</template>

<script setup>
import Navbar from "@/components/Navbar";
import Footer from "@/views/Footer.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #1890cc;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
