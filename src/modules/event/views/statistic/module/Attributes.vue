<template>
  <div class="px-3 py-3">
    <h3 class="text-base font-semibold leading-6 text-gray-900">Attribute</h3>
    <AttributeDetailList />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import AttributeDetailList from "@/modules/event/components/statistic/attribute/DetailList.vue";

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