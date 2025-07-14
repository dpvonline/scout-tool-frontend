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
      name: "Einladungen",
      linkName: { name: "EventInvitations", query: { status: "pending" } },
      current: route.name === "EventInvitations",
    },
    {
      name: "Anmeldungen",
      linkName: { name: "EventRegistrations", query: { status: "pending" } },
      current:
        route.name === "EventRegistrations" ||
        route.name === "EventRegistrations",
    },
    {
      name: "Planungsjurte",
      linkName: { name: "EventPlanungsjurte", query: { status: "open" } },
      current: route.name === "EventPlanungsjurte",
    },
  ];
});
</script>
