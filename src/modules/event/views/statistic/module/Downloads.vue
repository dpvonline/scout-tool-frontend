<template>
  <div class="px-3 py-3">
    <h3 class="text-base font-semibold leading-6 text-gray-900">Aktionen</h3>
    <PrimaryButton> Zahlungserinnerung senden </PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import PrimaryButton from "@/components/button/Primary.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();

const eventSummaryBookingOptions = computed(() => {
  return eventStore.eventSummaryBookingOptions;
});

const eventSummaryTotalParticipants = computed(() => {
  return eventStore.eventSummaryTotalParticipants;
});

const eventSummaryTotalRegistrations = computed(() => {
  return eventStore.eventSummaryTotalRegistrations;
});

const stats = computed(() => {
  return [
    { name: "Anmeldungen", stat: eventSummaryTotalParticipants.value },
    { name: "Gruppen", stat: eventSummaryTotalRegistrations.value },
  ];
});

onMounted(() => {
  const eventId = route.params.id;
  eventStore.fetchEventSummaryTotalParticipants(eventId);
  eventStore.fetchEventSummaryTotalRegistrations(eventId);
  eventStore.fetchEventSummaryBookingOptions(eventId);
});
</script>