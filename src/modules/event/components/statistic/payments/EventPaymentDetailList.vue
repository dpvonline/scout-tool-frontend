<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-4 flex grow items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span
                class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100"
              >
                <BanknotesIcon />
              </span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ item?.refId }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ item?.scoutOrganisation?.name }}
              </p>
            </div>
            <div class="flex">
              <div class="grow"></div>
              <div class="ml-4 mt-4 flex flex">
                <PrimaryButton
                  color="green"
                  :icon="PlusIcon"
                  @click="onPayedAddedClicked"
                  >Buchung</PrimaryButton
                >
              </div>
              <div class="ml-4 mt-4 flex flex">
                <PrimaryButton
                  :icon="PencilIcon"
                  @click="onRegClicked(item?.id)"
                  >Anmeldung</PrimaryButton
                >
              </div>
              <div class="ml-4 mt-4 flex flex">
                <PrimaryButton
                  :icon="EnvelopeIcon"
                  @click="onPaymentReminderClicked(item?.id)"
                  >Erinnerung</PrimaryButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-6 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Status
          </h3>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Summe der Zahlungen
        </p>
      </div>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Offene Posten</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ (item?.payement?.open || 0).toFixed(2) }} €
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Bezahlter Betrag</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ (item?.payement?.paid || 0).toFixed(2) }} €
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Zu zahlender Betrag</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ (item?.payement?.price || 0).toFixed(2) }} €
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Teilnehmende</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ item?.participantCount }} Personen
          </dd>
        </div>
      </dl>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Buchungen
          </h3>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div class="sm:col-span-2" v-if="item?.cashincomeSet?.length">
        <dd class="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              v-for="child in item?.cashincomeSet"
              :key="child.id"
            >
              <CashItem class="grow" :item="child" />
            </li>
          </ul>
        </dd>
      </div>
      <div v-else>
        <p class="text-sm">Noch keine Buchung</p>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Buchungs Optionen
          </h3>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div class="sm:col-span-2" v-if="item?.bookingOptions?.length">
        <dd class="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              v-for="child in item?.bookingOptions"
              :key="child.id"
            >
              <div class="flex w-0 flex-1 items-center">
                <AdjustmentsVerticalIcon
                  class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span>
                  {{
                    `${child.sum} ${child.bookingOptions} ${child.price.toFixed(
                      2
                    )} €`
                  }}</span
                >
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Verantwortliche Personen
          </h3>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div class="sm:col-span-2" v-if="item?.responsiblePersons?.length">
        <dd class="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              v-for="child in item?.responsiblePersons"
              :key="child.id"
            >
              <div class="flex w-0 flex-1 items-center">
                <UserCircleIcon
                  class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span>
                  {{
                    `${child.firstName} ${child.lastName} - ${child.email} - ${
                      child.phoneNumber || "keine Nummer"
                    }`
                  }}</span
                >
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </div>
    <SendPaymentReminderModal
      :open="openPaymentReminderModal"
      :isSaving="isSaving"
      :header="'Zahlungserinnerung'"
      :text="'Bist du sicher, dass du an diesen Stamm eine Zahlungserinnerung senden möchtest?'"
      :buttonText="'E-Mails senden'"
      :callbackOnConfirm="sendPaymentReminder"
      :callbackOnCancel="cancelModal"
    >
    </SendPaymentReminderModal>
    <PaymentOverlay
      header="Zahlung hinzufügen"
      :open="newPaymentDialog"
      :currentPayment="currentPayment"
      :callbackOnConfirm="onPayedAddedClicked"
      :callbackOnCancel="onNewPaymentClosedClicked"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import moment from "moment";

const router = useRouter();
const route = useRoute();

import {
  PencilIcon,
  CalendarIcon,
  PencilSquareIcon,
  PlusIcon,
  QueueListIcon,
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
  CpuChipIcon,
  ArrowSmallUpIcon,
  UserCircleIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
  CurrencyEuroIcon,
} from "@heroicons/vue/24/outline";

import PaymentOverlay from "@/modules/event/components/statistic/payments/newPayment/Overlay.vue";
import TimelineEvent from "@/modules/event/components/general/TimelineEvent.vue";
import CashItem from "@/modules/event/components/statistic/payments/CashItem.vue";
import SendPaymentReminderModal from "@/components/modal/Delete.vue";
import PrimaryButton from "@/components/button/Primary.vue";

const openPaymentReminderModal = ref(false);

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

const eventData = ref({});
const isSaving = ref(false);


const openPaymentEdit = ref(false);
const eventEditForm = ref(0);

const newPaymentDialog = ref(false);
const currentPayment = ref({});

function onPaymentEditClicked(formNo, child = null) {
  openPaymentEdit.value = true;
  eventEditForm.value = formNo;
  if (child === null) {
    eventData.value = props.event;
  } else {
    eventData.value = child;
  }
}

function onPaymentClosedClicked() {
  openPaymentEdit.value = false;
  eventData.value = {};
}

function onPayedAddedClicked() {
  newPaymentDialog.value = true;
  currentPayment.value = props.item;
}

function onStatisticsClicked() {
  const id = route.params.id;
  router.push({
    name: "EventStatisticSummary",
    params: {
      id,
    },
  });
}

function onRegClicked(id) {
  const regId = route.params.id;
  if (regId) {
    router.push({
      name: "RegistrationsDetail",
      params: {
        regId,
      },
    });
  }
}

function onNewPaymentClosedClicked() {
  newPaymentDialog.value = false;
}

async function sendPaymentReminder() {
  isSaving.value = true;
  const registrationId = route.params.id;
  const response = await eventStore.sendSinglePaymentReminder({ registrationId });
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

const props = defineProps({
  item: Object,
});
</script>