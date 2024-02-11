<template>
  <PageWrapper>
    <MyTabGroupBig :tabs="tabs" />
  </PageWrapper>
</template>

<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useRoute } from "vue-router";

import MyTabGroupBig from "@/components/menu/TabGroupBig.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import {useEventStore} from "@/modules/event/store";

const route = useRoute();

const tabs = computed(() => {
  return [
    {
      name: "Übersicht",
      linkName: { name: "EventStatisticSummary" },
      current: route.name === "EventStatisticSummary",
      disabled: false,
    },
    {
      name: "Gruppen",
      linkName: {
        name: "EventStatisticRegistration",
        pararms: { ordering: "-created_at" },
      },
      disabled: false,
      current: route.name === "EventStatisticRegistration",
    },
    {
      name: "Zahlen",
      linkName: { name: "EventStatisticResults" },
      current: route.name === "EventStatisticResults",
      disabled: false,
    },
    {
      name: "Geld",
      linkName: { name: "EventStatisticPayments", query: { paid: "false" } },
      current: route.name === "EventStatisticPayments",
      disabled: !eventIsAdmin.value && !eventIsLeader.value,
    },
    {
      name: "Attribute",
      linkName: { name: "EventStatisticAttributes" },
      current: route.name === "EventStatisticAttributes",
      disabled: false,
    },
    {
      name: "Personen",
      linkName: { name: "EventStatisticPersons" },
      current: route.name === "EventStatisticPersons",
      disabled: !eventIsAdmin.value && !eventIsLeader.value,
    },
    {
      name: "Download",
      linkName: { name: "EventStatisticDownloads" },
      current: route.name === "EventStatisticDownloads",
      disabled: !eventIsAdmin.value,
    },
    {
      name: "Karte",
      linkName: { name: "EventStatisticMaps" },
      current: route.name === "EventStatisticMaps",
      disabled: false,
    },
    {
      name: "Mail",
      linkName: { name: "EventStatisticMail" },
      current: route.name === "EventStatisticMail",
      disabled: !eventIsAdmin.value,
    },
  ];
});

const eventStore = useEventStore();

const eventIsAdmin = computed(() => {
  return eventStore.event.canEdit === "Admin";
});

const eventIsLeader = computed(() => {
  return eventStore.event.canViewLeader !== "None";
});

onMounted(async () => {
  // isLoading.value = true;
  const eventId = route.params.id;
  const responses = await Promise.all([
    eventStore.fetchEvent(eventId),
  ]);
  // isLoading.value = false;
  console.log(!eventIsLeader.value);
  console.log(!eventIsAdmin.value);
});
</script>
