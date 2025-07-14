<template>
  <div class="md:pa-64">
    <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <main class="flex-1">
        <Header :pages="page"/>
        <Content/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  ChevronRightIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

import Content from "@/modules/landing/components/impressum/Content.vue";

const page = [{ name: "Hauptseite", link: "home" }];
import { useLandingStore } from "@/modules/landing/store";
const route = useRoute();

const ladingStore = useLandingStore();

const searchValue = ref();

const privacys = computed(() => {
  return ladingStore.privacys;
});

onMounted(() => {
  ladingStore.fetchPrivacys();
});
</script>