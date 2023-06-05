<template>
  <div class="mx-2 my-2">
    <PrimaryButton @click="onNewFileRequest">
      Neue Datei anfordern
    </PrimaryButton>
    <PrimaryButton class="mx-2" @click="onRefreshClicked">
      Neu laden
    </PrimaryButton>
    <ul
      v-if="generatedFiles && generatedFiles.length > 0"
      role="list"
      class="divide-y divide-gray-100"
    >
      <li
        v-for="file in generatedFiles"
        :key="file.id"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div v-if="file.status !== 'FF'" class="flex-1 gap-x-4">
          {{ file.template?.extension }} -
          {{ file.template?.type }} -
          Version {{ file.template?.version }}
        </div>
        <div class="flex-1 gap-x-4 text-red-400">
          {{ file.errorMsg }}
        </div>
        <div class="flex gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              Angefordert: {{ $dayjs(file.createdAt).format("llll") }}    
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              von {{ file.user?.firstName }}
            </p>
          </div>
        </div>
        <button
          v-if="file.status === 'FS'"
          @click="onDownloadClicked(file.file)"
          class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Download
        </button>
      </li>
    </ul>
    <div v-else>
      <p>Noch keine Datei</p>
    </div>
    <NewFileRequestOverlay
      :open="openOverlay"
      @close="onNewFileRequestCloseClicked"
      header="Neue File anfordern"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import PrimaryButton from "@/components/button/Primary.vue";
import NewFileRequestOverlay from "@/modules/event/components/statistic/download/newFileRequest/Overlay.vue";


const openOverlay = ref(false);

function onNewFileRequest() {
  openOverlay.value = true;
}

function onDownloadClicked(url) {
  window.open(url);
}

function onRefreshClicked(url) {
  generatedFiles.value = [];
  onRefresh();
}

function onNewFileRequestCloseClicked() {
  openOverlay.value = false;
  onRefresh()
}

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const isLoading = ref(false);

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const generatedFiles = ref([]);

async function onRefresh() {
  const eventId = route.params.id;
  isLoading.value = true;

  const response = await Promise.all([eventStore.getDownloadSummary(eventId)]);
  generatedFiles.value = response[0].data;
  isLoading.value = false;
}

onMounted(async () => {
  onRefresh()
});
</script>
