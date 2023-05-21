<template>
  <PageWrapper>
    <MyTabGroupBig :tabs="tabs" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MyTabGroupBig from "@/components/menu/TabGroupBig.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";

const route = useRoute();

const tabs = computed(() => {
  return [
    {
      name: "Übersicht",
      linkName: { name: "EventStatisticSummary" },
      current: route.name === "EventStatisticSummary",
    },
    {
      name: "Gruppen",
      linkName: {
        name: "EventStatisticRegistration",
        pararms: { ordering: "-created_at" },
      },
      current: route.name === "EventStatisticRegistration",
    },
    {
      name: "Auswertungen",
      linkName: { name: "EventStatisticResults" },
      current: route.name === "EventStatisticResults",
    },
    {
      name: "Zahlungen",
      linkName: { name: "EventStatisticPayments" },
      current: route.name === "EventStatisticPayments",
    },
    {
      name: "Attribute",
      linkName: { name: "EventStatisticAttributes" },
      current: route.name === "EventStatisticAttributes",
    },
    {
      name: "Personen",
      linkName: { name: "EventStatisticPersons" },
      current: route.name === "EventStatisticPersons",
    },
    {
      name: "Downloads",
      linkName: { name: "EventStatisticDownloads" },
      current: route.name === "EventStatisticDownloads",
    },
  ];
});
</script>
