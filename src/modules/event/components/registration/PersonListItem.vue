<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <EnvelopeIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props.item.firstName }} {{ props.item.lastName }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          {{ props?.item?.scoutGroup?.name }}
        </p>
      </div>
      <div class="hidden md:block"></div>
    </div>
    <div class="flex-1">
      <PrimaryButton @click="onDeletePersonClicked(props?.item)" color="red"
        >löschen</PrimaryButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/button/Primary.vue";

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";
import moment from "moment";
const props = defineProps({
  item: Object,
});

function onDeletePersonClicked(item) {
    eventRegisterStore.removePerson(item);
}

</script>
