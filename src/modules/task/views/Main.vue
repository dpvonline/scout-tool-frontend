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
      name: "Aufgaben",
      linkName: { name: "AllTasks", query: { status: "offen" } },
      current: route.name === "AllTasks",
    },
    {
      name: "Meine Aufgaben",
      linkName: { name: "MyRequestedTasks", query: { status: "offen" } },
      current: route.name === "MyRequestedTasks",
    },
    {
      name: "Anfragen",
      linkName: { name: "NewMessages" },
      current: route.name === "NewMessages",
    },
  ];
});
</script>
