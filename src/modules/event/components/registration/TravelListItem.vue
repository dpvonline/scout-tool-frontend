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
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
      <div>
        <p class="text-sm font-medium text-black-600">
          {{ props.item.numberPersons }} Person/en mit
          {{ props.item.typeField?.name }} um
          {{ this.$dayjs(props.item.dateTimeField).format("llll") }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          {{ props.item.description }}
        </p>
      </div>
      <div class="hidden md:block"></div>
    </div>
    <div class="flex-none w-20">
      <PrimaryButton @click="onTravelEditClicked(props?.item)" color="blue"
        >ändern</PrimaryButton
      >
    </div>
    <div class="flex-none w-20 mx-2 my-2">
      <PrimaryButton @click="onDeleteTravelClicked(props?.item)" color="red"
        >löschen</PrimaryButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/button/Primary.vue";

import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";
import moment from "moment";

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const props = defineProps({
  item: Object,
});

const emit = defineEmits(["onTravelEditClicked"]);

const onTravelEditClicked = (data) => {
  emit("onTravelEditClicked", data);
};

function onDeleteTravelClicked(item) {
  eventRegisterStore.removeTravel(item);
}
</script>
