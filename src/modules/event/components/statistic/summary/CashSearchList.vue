<template>
  <div>
    <PrimaryButton
      @click="onPaymentReminderClicked"
      class="ma-2 my-2"
      :icon="CurrencyEuroIcon"
    >
      Zahlungserinnerung an alle
    </PrimaryButton>
    <p>Gesamtbeitrag: {{ (eventCashSummary.total || 0).toFixed(2) }} €</p>
    <p>Bereits bezahlt: {{ (eventCashSummary.paid || 0).toFixed(2) }} €</p>
    <p>Noch offen: {{ (eventCashSummary.unpaid || 0).toFixed(2) }} €</p>
    <List
      :name="'Alle Zahlungen'"
      :items="eventCashListSummary"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="EventStatisticPayments"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <CashListItem :item="item" />
      </template>
    </List>
    <SendPaymentReminderModal
      :open="openPaymentReminderModal"
      :isSaving="isSaving"
      :header="'Zahlungserinnerung'"
      :text="'Bist du sicher, dass du an alle Stämme eine Zahlungserinnerung senden möchtest?'"
      :buttonText="'E-Mails senden'"
      :callbackOnConfirm="sendPaymentReminder"
      :callbackOnCancel="cancelModal"
    >
    </SendPaymentReminderModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  TagIcon,
  ChevronRightIcon,
  HomeIcon,
  CurrencyEuroIcon,
} from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import CashListItem from "@/modules/event/components/statistic/summary/CashListItem.vue";
import { useRoute } from "vue-router";
import PrimaryButton from "@/components/button/Primary.vue";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

const route = useRoute();

const isSaving = ref(false);

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const eventCashListSummary = computed(() => {
  if (
    eventStore.eventCashListSummary &&
    eventStore.eventCashListSummary.length
  ) {
    return eventStore.eventCashListSummary;
  }
  return [];
});

const eventCashSummary = computed(() => {
  return eventStore.eventCashSummary;
});

const searchValue = ref();

const groups = computed(() => {
  return eventStore.groups;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

const isLoading = computed(() => {
  return false;
});

onMounted(() => {
  const id = route.params.id;
  updateSearch(route.query);
  eventStore.fetchCashSummary(id);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

import SendPaymentReminderModal from "@/components/modal/Delete.vue";

const openPaymentReminderModal = ref(false);

function updateSearch(params) {
  const id = route.params.id;
  if (id) {
    eventStore.fetchCashListSummary(id, params);
  }
}

const sortOptions = [];

const filters = [
  {
    id: "paid",
    name: "Vollständig bezahlt?",
    options: [
      { value: "true", label: "Ja", checked: false },
      { value: "false", label: "Nein", checked: true },
    ],
  },
];
const buttonList = [];

import { useRouter } from "vue-router";
const router = useRouter();

async function sendPaymentReminder() {
  isSaving.value = true;
  const eventId = route.params.id;
  const obj = await eventStore.sendPaymentReminder({ eventId });
  const response = obj?.response;
  if (response && response?.status === 200) {
    commonStore.showSuccess("E-Mail erfolgreich versendet");
  } else {
    commonStore.showError("E-Mail nicht versendet");
  }
  openPaymentReminderModal.value = false;
}

function onPaymentReminderClicked() {
  openPaymentReminderModal.value = true;
}

async function cancelModal() {
  openPaymentReminderModal.value = false;
}
</script>
