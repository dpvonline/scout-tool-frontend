<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <UserIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 grow px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props?.item?.firstName }} {{ props?.item?.lastName }} ({{ ($dayjs().diff($dayjs(props?.item?.birthday)) / (60 * 60 * 24 * 1000 * 365)).toFixed(0) }})
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          {{ props?.item?.bookingOptionName }}
        </p>
      </div>
      <div class="hidden md:block"></div>
    </div>
    <div class="flex-none w-20 hidden md:block">
      <PrimaryButton @click="onPersonEditClicked(props?.item)" color="blue"
        >ändern</PrimaryButton
      >
    </div>
    <div class="flex-none mx-1 md:hidden block">
      <PrimaryButton :icon="PencilIcon" @click="onPersonEditClicked(props?.item)" color="blue"
        ></PrimaryButton
      >
    </div>
    <div class="flex-none w-20 mx-2 my-2 hidden md:block">
      <PrimaryButton @click="onDeletePersonClicked(props?.item)" color="red"
        >löschen</PrimaryButton
      >
    </div>
    <div class="flex-none sm:hidden block">
      <PrimaryButton :icon="TrashIcon" @click="onDeletePersonClicked(props?.item)" color="red"
        ></PrimaryButton
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
  PencilIcon,
  TrashIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  item: Object,
});

function onDeletePersonClicked(item) {
  eventRegisterStore.removePerson(item);
}

const emit = defineEmits(["onPersonEditClicked"]);

const onPersonEditClicked = (data) => {
  emit("onPersonEditClicked", data);
};
</script>
