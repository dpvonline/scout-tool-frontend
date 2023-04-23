<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span
                class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100"
              >
                <CalendarIcon />
              </span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ event.name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ event.shortDescription }}
              </p>
            </div>
          </div>
        </div>
        <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton
            @click="onEventEditClicked"
            :icon="PencilIcon"
            class="mx-0 my-2"
          >
            Veranstaltung Bearbeiten
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Einladungstext</dt>
          <dd
            class="mt-1 text-sm text-gray-900"
            v-html="event.longDescription"
          ></dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Start</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ moment(event.startDate).format("llll") }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Ende</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ moment(event.endDate).format("llll") }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Anmeldeschluss</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ moment(event.registrationDeadline).format("llll") }}
          </dd>
        </div>
      </dl>
    </div>
    <EventEditOverlay
      :open="openEventEdit"
      :items="eventData"
      @close="onEventClosedClicked"
      header="Event bearbeiten"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import moment from "moment";
import {
  PencilIcon,
  CalendarIcon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";

import EventEditOverlay from "@/modules/event/components/EventEdit/Overlay.vue"

// messsage
const eventData = ref({});

// issue
const openEventEdit = ref(false);

function onEventEditClicked() {
  openEventEdit.value = true;
  eventData.value = props.event;
}

function onEventClosedClicked() {
  openEventEdit.value = false;
  eventData.value = {};
}

const props = defineProps({
  event: Object,
});
</script>