<template>
  <div class="px-3 py-3">
    <h2 class="text-base ma-2 my-2 font-semibold leading-6 text-gray-900">
      Downloads
    </h2>
    <DownloadDetailList :item="generatedFiles" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useEventStore } from "@/modules/event/store";
import SendPaymentReminderModal from "@/components/modal/Delete.vue";
import DownloadDetailList from "@/modules/event/components/statistic/download/DetailList.vue";

import { PlusIcon, CurrencyEuroIcon } from "@heroicons/vue/20/solid";

import PrimaryButton from "@/components/button/Primary.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

const isLoading = ref(false);

import { useRoute, useRouter } from "vue-router";

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

const openPaymentReminderModal = ref(false);

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

const generatedFiles = ref([]);

onMounted(async () => {
  const eventId = route.params.id;
  isLoading.value = true;

  const response = await Promise.all([eventStore.getDownloadSummary(eventId)]);
  generatedFiles.value = response[0].data;
  isLoading.value = false;
});

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
</script>