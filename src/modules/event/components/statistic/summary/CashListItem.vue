<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <RocketLaunchIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props.item?.scoutOrganisation?.name }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <ClipboardIcon
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <p class="text-red-500"
            >offen: {{ (props.item?.payement.open).toFixed(2) }} €
          </p>
          <p class="mx-2 text-green-500"
            >bezahlt: {{ (props.item?.payement.paid).toFixed(2) }} €
          </p>
        </p>
      </div>
      <div class="hidden md:block">
        <div>
          <p class="mt-2 flex items-center text-sm text-gray-500">
            {{
              props.item?.responsiblePersons
                ?.map((a) => `${a.firstName} ${a.lastName}`)
                .join(", ")
            }}
          </p>
        </div>
      </div>
    <div>
      <PrimaryButton @click="onPayedClicked" color="green">
        Als Bezahlt makieren
      </PrimaryButton>
      <PrimaryButton @click="onAddPaymentClicked" class="sm:mx-2 my-1">
        Buchungen
      </PrimaryButton>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import moment from "moment";
import PrimaryButton from "@/components/button/Primary.vue";

const props = defineProps({
  item: Object,
});

function onPayedClicked() {
  debugger;
}

function onAddPaymentClicked() {
  debugger;
}
</script>
