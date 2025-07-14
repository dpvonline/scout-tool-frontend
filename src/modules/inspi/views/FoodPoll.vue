<template>
  <PageWrapper class="mt-12 sm:mt-0">
    <div class="px-6 py-6">
      <p class="text-lg leading-6 text-gray-600 px-6 py-6">
        Welches der beiden Produkte findest du nachhaliger?
      </p>
      <div class="flex flex-wrap justify-center">
      <img
        class="h-32 sm:h-48 w-auto mx-6 my-6 mx-auto"
        src="./../../../assets/food-inspi.png"
        alt="Pfadfinderlilie"
      />
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="person in packageRandomPolls"
          :key="person.id"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-blue-100 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-400 hover:bg-green-100"
        >
          <div class="min-w-0 flex-1">
            <a
              href="#"
              @click="onPollItemClicked(person.id)"
              class="focus:outline-none"
            >
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="onPollItemClicked(null)"
        class="rounded bg-white my-6 mx-2 py-3 px-4 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Überspringen
      </button>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";

import PageWrapper from "@/components/base/PageWrapper.vue";
import { useInspiStore } from "@/modules/inspi/store";

import { useRouter } from "vue-router";

const router = useRouter();

const inspiStore = useInspiStore();

const packageRandomPolls = computed(() => {
  return inspiStore.packageRandomPolls;
});

onMounted(() => {
  inspiStore.fetchPackageRandomPoll();
});

function onPollItemClicked(winnerId) {
  inspiStore.sendItemPoll(packageRandomPolls, winnerId).then((response) => {
    location.reload();
  });
}
</script>
