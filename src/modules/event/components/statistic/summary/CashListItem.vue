<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <DocumentTextIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props.item?.scoutOrganisation?.name }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <BanknotesIcon
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <p class="text-red-500"
            >offen: {{ (props.item?.payment.open).toFixed(2) }} €
          </p>
          <p class="mx-2 text-green-500"
            >bezahlt: {{ (props.item?.payment.paid).toFixed(2) }} €
          </p>
        </p>
      </div>
      <div class="hidden md:block">
        <div>
          <p class="mt-2 flex items-center text-sm text-gray-500">
            Verantwortlich:
            {{
              props.item?.responsiblePersons
                ?.map((a) => `${a.firstName} ${a.lastName}`)
                .join(", ")
            }}
          </p>
        </div>
      </div>
    <div>
      <PrimaryButton :icon="PlusIcon" @click="onPayedClicked(props.item)" color="green">
        Zahlung
      </PrimaryButton>
      <PrimaryButton :icon="BanknotesIcon" @click="onAddPaymentClicked(props.item.id)" class="mx-2 my-1">
        Buchungen
      </PrimaryButton>
    </div>
    </div>
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
import { ref } from "vue";

import PaymentOverlay from "@/modules/event/components/statistic/payments/newPayment/Overlay.vue";

import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  BanknotesIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/vue/24/outline";

import PrimaryButton from "@/components/button/Primary.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const newPaymentDialog = ref(false);
const currentPayment = ref({});

const props = defineProps({
  item: Object,
});

function onPayedClicked(item) {
  newPaymentDialog.value = true;
  currentPayment.value = item;
}

function onPayedAddedClicked() {
  newPaymentDialog.value = true;
}

function onAddPaymentClicked(id) {
  if (id) {
    router.push({
      name: "EventPaymentDetails",
      params: {
        id,
      },
    });
  }
}

function onNewPaymentClosedClicked() {
  newPaymentDialog.value = false;
}
</script>
