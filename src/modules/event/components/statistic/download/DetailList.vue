<template>
  <div class="mx-2 my-2">
    <PrimaryButton @click="onNewFileRequest">
      Neue Datei anfordern
    </PrimaryButton>
    <ul
      v-if="props.item && props.item.length > 0"
      role="list"
      class="divide-y divide-gray-100"
    >
      <li
        v-for="file in props.items"
        :key="file.id"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div class="flex gap-x-4">
          <img
            class="h-12 w-12 flex-none rounded-full bg-gray-50"
            :src="file.imageUrl"
            alt=""
          />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              {{ file.name }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ file.email }}
            </p>
          </div>
        </div>
        <button
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
import { ref } from "vue";

import PrimaryButton from "@/components/button/Primary.vue";
import NewFileRequestOverlay from "@/modules/event/components/statistic/download/newFileRequest/Overlay.vue";

const props = defineProps({
  items: Object,
});

const openOverlay = ref(false);

function onNewFileRequest() {
  openOverlay.value = true;
}

function onNewFileRequestCloseClicked() {
  openOverlay.value = false;
}
</script>
