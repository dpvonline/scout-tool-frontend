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
                <InboxIcon />
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
            @click="onIssueEditClicked"
            :icon="PencilIcon"
            class="mx-0 my-2"
          >
            Issue Bearbeiten
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div v-if="event.createdByEmail" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            E-Mail vom Nichtangemeldeten
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.createdByEmail }}
          </dd>
        </div>
        <div v-if="event.createdBy" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Username</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.createdBy.username }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Erstellt</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              event.createdAt ? moment(event.createdAt).format("llll") : ""
            }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.status }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Prioität</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.priority }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <h2>Nachrichten</h2>
        </div>
        <div
          class="sm:col-span-2 border border-1 px-2 py-2"
          v-for="item in event.messages"
          :key="item.id"
        >
          <dt class="text-sm font-medium text-gray-500">
            von {{ item.createdBy ? item.createdBy.username : "Extern" }}
          </dt>
          <dd class="mt-1 text-sm text-gray-900">{{ item.messageBody }}</dd>
          <dd class="mt-1 text-xs text-gray-500">
            {{ moment(item.createdAt).format("llll") }}
          </dd>
        </div>
        <PrimaryButton
          @click="onEventUpdateClicked"
          :icon="ChatBubbleLeftIcon"
          class="mx-0 my-2"
        >
          antworten
        </PrimaryButton>
      </dl>
    </div>
    <MessageEditOverlay
      :open="openEventAddEdit"
      :items="eventData"
      @close="onEventClosedClicked"
      header="Nachricht erstellen"
    />
    <IssueEditOverlay
      :open="openIssueEdit"
      :items="eventData"
      @close="onIssueClosedClicked"
      header="Issue bearbeiten"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

import moment from "moment";
import {
  PaperClipIcon,
  PencilIcon,
  ChatBubbleLeftIcon,
  InboxIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";

import MessageEditOverlay from "@/modules/message/components/MessageEdit/Overlay.vue";
import IssueEditOverlay from "@/modules/message/components/IssueEdit/Overlay.vue";

// messsage
const openEventAddEdit = ref(false);
const eventData = ref({});

function onEventUpdateClicked() {
  openEventAddEdit.value = true;
  eventData.value = props.event;
}

function onEventClosedClicked() {
  openEventAddEdit.value = false;
  eventData.value = {};
}

// issue
const openIssueEdit = ref(false);

function onIssueEditClicked() {
  openIssueEdit.value = true;
  eventData.value = props.event;
}

function onIssueClosedClicked() {
  openIssueEdit.value = false;
  eventData.value = {};
}

const props = defineProps({
  event: Object,
});
</script>