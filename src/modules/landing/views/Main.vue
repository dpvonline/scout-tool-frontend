<template>
  <div class="bg-white">
    <div
      class="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20"
    >
      <Header/>
      <FeatureSection/>
      <Support/>
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon, LockClosedIcon, PlusIcon } from "@heroicons/vue/20/solid";

import Header from "@/modules/landing/components/Header.vue" 
import FeatureSection from "@/modules/landing/components/FeatureSection.vue"
import Support from "@/modules/landing/components/Support.vue"
import Footer from "@/modules/landing/components/Footer.vue"
</script>