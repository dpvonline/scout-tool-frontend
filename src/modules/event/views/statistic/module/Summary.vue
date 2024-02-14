<template>
  <div>
    <div v-if="!isLoading" class="px-3 py-3">
       <div class="border border-gray-400 p-3" v-if="canViewLeaderAsLeader">
         <p class="text-2xl tracking-tight text-red-400">
           Du siehst die Statistiken als {{ leaderName }}
         </p>
         <p class="text-xl tracking-tight text-red-400">
           Du siehst nur Zahlen aus deinem Bund / Ring.
         </p>
       </div>
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Anmeldezahlen
      </h3>
      <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="item in stats"
          :key="item.name"
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            {{ item.name }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ item.stat }}
          </dd>
        </div>
      </dl>
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Buchungsoptionen
      </h3>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="item in eventSummaryBookingOptions"
          :key="item.name"
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            {{ item.name }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ item.value }}
          </dd>
        </div>
      </dl>
      <div>
        <RegByDate :data="regByDateData"/>
      </div>
    </div>
    <LoadingItem v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import RegSearchList from "@/modules/event/components/statistic/summary/RegSearchList.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import RegByDate from "@/modules/event/components/statistic/overview/chart/RegByDate.vue"

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();

const isLoading = ref(false);
const regByDateData = ref([]);

const eventSummaryBookingOptions = computed(() => {
  return eventStore.eventSummaryBookingOptions;
});

const eventSummaryTotalParticipants = computed(() => {
  return eventStore.eventSummaryTotalParticipants;
});

const eventSummaryTotalRegistrations = computed(() => {
  return eventStore.eventSummaryTotalRegistrations;
});

const canViewLeaderAsLeader = computed(() => {
  return eventStore.event.canViewLeader !== "None" && eventStore.event.canEdit === "None" && eventStore.event.canView === "None";
});

const leaderName = computed(() => {
  return eventStore.event.canViewLeader;
});

const stats = computed(() => {
  return [
    { name: "Anmeldungen", stat: eventSummaryTotalParticipants.value || 0 },
    { name: "Gruppen", stat: eventSummaryTotalRegistrations.value || 0},
  ];
});

onMounted(async () => {
  isLoading.value = true;
  const eventId = route.params.id;
  const responses = await Promise.all([
    eventStore.fetchEventSummaryTotalParticipants(eventId),
    eventStore.fetchEventSummaryTotalRegistrations(eventId),
    eventStore.fetchEventSummaryBookingOptions(eventId),
    eventStore.fetchEvent(eventId),
  ])

  const params = {};
  regByDateData.value = await eventStore.fetchEventSummaryRegByDate(eventId, params);
  isLoading.value = false;
});
</script>
