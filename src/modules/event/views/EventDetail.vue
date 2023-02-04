<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const event = computed(() => {
  return eventStore.event;
});

const pages = [{ name: "Alle Events", link: "EventMain" }];

onMounted(() => {
  const id = route.params.id;
  if (id) {
    eventStore.fetchEvent(id);
  }
});
</script>