<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Betreff: {{ issueType.messageSubject ? issueType.messageSubject : ' fehlt' }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Kategorie: {{ issueType.issueType?.name }}
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">

      <PrimaryButton @click="onEventUpdateClicked" :icon="PencilIcon" class="mx-0 my-2">
        Nachricht Bearbeiten
      </PrimaryButton>

      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div v-if="issueType.createdByEmail" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">E-Mail vom Nichtangemeldeten</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ issueType.createdByEmail }}
          </dd>
        </div>
        <div v-if="issueType.createdBy" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Username</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ issueType.createdBy.username }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Zugewiesen</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ issueType.supervisor ? issueType.supervisor : " Niemanden " }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Erfolgreich bearbeitet
          </dt>
          <!-- <dd class="mt-1 text-sm text-gray-900">
            {{ issueType.isProcessed ? "Ja" : "Nein" }}
          </dd> -->
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Erstellt</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              issueType.createdAt ? moment(issueType.createdAt).format("llll") : ""
            }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Nachricht</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ issueType.messageBody }}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Internes Kommentar</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              issueType.internalComment
                ? issueType.internalComment
                : "Noch kein Vermerk"
            }}
          </dd>
        </div>
      </dl>
    </div>
    <issueTypeEditOverlay
      :open="openEventAddEdit"
      :items="eventData"
      @close="onEventClosedClicked"
      header="Nachricht bearbeiten"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

import moment from "moment";
import { PaperClipIcon, PencilIcon } from "@heroicons/vue/24/solid";
import PrimaryButton from "@/components/button/Primary.vue";

import issueTypeEditOverlay from "@/modules/message/components/issueTypeEdit/Overlay.vue";

const openEventAddEdit = ref(false);
const eventData = ref({});

function onEventUpdateClicked() {
  openEventAddEdit.value = true;
  eventData.value = issueType.value;
}

function onEventClosedClicked() {
  openEventAddEdit.value = false;
  eventData.value = {};
}

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from '@/modules/person/components/list/ReadOnlyPerson.vue'

import { useMessageStore } from "@/modules/message/store";

const messageStore = useMessageStore();
const route = useRoute();

const isLoading = computed(() => {
  return messageStore.isLoading;
});

const issueType = computed(() => {
  return messageStore.issueType;
});

onMounted(() => {
  const id = route.params.id;
  if (id) {
    messageStore.fetchIssueTypeById(id);
  }
});

</script>