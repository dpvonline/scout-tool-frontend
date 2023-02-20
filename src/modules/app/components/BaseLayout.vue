<template>
  <div class="h-full w-full overflow-scroll" >
    <header class="bg-gradient-to-r from-blue-600 to-blue-700 pb-24">
      <Header/>
    </header>
    <main class="-mt-24 pb-8 min-h-screen" >
      <slot/>
    </main>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script setup lang="ts">

import Footer from '@/modules/app/components/Footer.vue'
import Header from '@/modules/app/components/GlobalHeader.vue'

</script>

<style>
</style>