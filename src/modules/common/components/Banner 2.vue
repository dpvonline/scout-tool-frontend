<template>
  <div
    v-if="bannerStatus"
    class="pointer-events-none fixed inset-x-0 top-10 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50"
  >
    <div
      class="pointer-events-auto flex items-center justify-between gap-x-6 bg-blue-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5 z-50"
    >
      <p class="text-sm leading-6 text-white">
        <strong class="font-semibold">{{ bannerHeader }}</strong
        ><svg
          viewBox="0 0 2 2"
          class="mx-2 inline h-0.5 w-0.5 fill-current"
          aria-hidden="true"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <span>
          {{ bannerMesasge }}
        </span>
      </p>
      <button
        type="button"
        class="-m-1.5 flex-none p-1.5"
        @click="onCloseBanner"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

function onCloseBanner() {
  commonStore.hideBanner();
}

const bannerMesasge = computed(() => {
  return commonStore.bannerMesasge;
});
const bannerHeader = computed(() => {
  return commonStore.bannerHeader;
});

const bannerStatus = computed(() => {
  return commonStore.bannerStatus;
});
</script>