<template>
  <div class="px-3 py-3">
    <h3 class="text-base font-semibold leading-6 text-gray-900">Attribute</h3>
    <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
      >
        <dt class="truncate text-sm font-medium text-gray-500">Gesamt</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {{ eventAttributesSummary || "Fehler" }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import RegSearchList from "@/modules/event/components/statistic/summary/RegSearchList.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();

const eventAttributesSummary = computed(() => {
  return eventStore.eventAttributesSummary;
});

onMounted(() => {
  const eventId = route.params.id;
  eventStore.fetchAttributesSummary(eventId);
});
</script>