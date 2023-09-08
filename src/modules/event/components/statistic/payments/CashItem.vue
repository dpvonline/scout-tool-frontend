<template>
  <div class="flex flex-1 w-full py-5">
    <div class="flex mr-2 sm:mr-0 gap-x-4">
      <BanknotesIcon
        class="h-6 w-6 flex-none rounded-full"
        :class="[props.item.amount > 0 ? 'text-green-500' : 'text-red-500']"
        alt=""
      />
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">
          {{ (props.item?.amount).toFixed(2) }} €
        </p>
        <p class="mt-1 flex text-xs leading-5 text-gray-500"></p>
      </div>
    </div>
    <div class="grow items-center gap-x-6">
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Buchung</p>
        <p class="text-xs text-black">{{ props?.item?.transferSubject }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ $dayjs(props.item.transferDate).format("llll") }}
        </p>
        <div class="mt-1 flex items-center gap-x-1.5">
          <p class="text-xs leading-5 text-gray-500">
            {{ props?.item?.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="grow items-center gap-x-6">
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">
          Eingetragen vom {{ props?.item?.transferPerson?.firstName }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          am {{ $dayjs(props.item.createdAt).format("llll") }}
        </p>
      </div>
    </div>
    <div class="ml-4">
      <PrimaryButton :icon="PencilIcon" @click="onPayedAddedClicked">
        Buchung
      </PrimaryButton>
    </div>
    <PaymentOverlay
      header="Zahlung ändern"
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
} from "@heroicons/vue/24/outline";

import PrimaryButton from "@/components/button/Primary.vue";

const props = defineProps({
  item: Object,
});

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";

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

function onNewPaymentClosedClicked() {
  newPaymentDialog.value = false;
}
</script>
