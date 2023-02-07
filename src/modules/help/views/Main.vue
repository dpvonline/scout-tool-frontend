<template>
  <PageWrapper>
    <MyTabGroup :tabs="tabs" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MyTabGroup from "@/components/menu/TabGroup.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";

const route = useRoute();

const tabs = computed(() => {
  return [
    {
      name: "Alle Tips ",
      linkName: { name: "AllHints" },
      current: route.name === "AllHints",
    },
    {
      name: "Fehler melden",
      linkName: { name: "MessageNew3" },
      current: route.name === "MessageNew3",
    },
  ];
});
</script>
