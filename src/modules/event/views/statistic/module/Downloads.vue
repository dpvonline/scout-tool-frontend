<template>
  <div class="px-3 py-3">
    <h2 class="text-base ma-2 my-2 font-semibold leading-6 text-gray-900">
      Aktionen
    </h2>
    <ul role="list" class="mx-5 space-y-1">
      <li>
        <PrimaryButton @click="onPaymentReminderClicked" class="ma-2 my-2" :icon="CurrencyEuroIcon">
          Zahlungserinnerung senden
        </PrimaryButton>
      </li>
      <li>
        <PrimaryButton
          @click="onNewRegClicked"
          class="pa-2 py-2"
          :icon="PlusIcon"
        >
          Neue Anmeldung hinzufügen
        </PrimaryButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon, CurrencyEuroIcon } from "@heroicons/vue/20/solid";

import PrimaryButton from "@/components/button/Primary.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute, useRouter } from "vue-router";

function onPaymentReminderClicked() {
  const eventId = route.params.id;
  eventStore.sendPaymentReminder({eventId})
}

const route = useRoute();
const router = useRouter();

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();

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

function onNewRegClicked() {
  const eventId = route.params.id;
  eventRegisterStore.$reset();

  router.push({
    name: "RegistrationNewStart",
    params: {
      id: eventId,
    },
  });
}

onMounted(() => {
  const eventId = route.params.id;
  eventStore.fetchEventSummaryTotalParticipants(eventId);
  eventStore.fetchEventSummaryTotalRegistrations(eventId);
  eventStore.fetchEventSummaryBookingOptions(eventId);
});
</script>