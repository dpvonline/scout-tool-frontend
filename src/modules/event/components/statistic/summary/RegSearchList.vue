<template>
  <div>
    <List
      :name="'Alle Anmeldungen'"
      :items="eventSummary"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="EventStatisticRegistration"
      detailPageLink="RegistrationsDetail"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <RegListItem :item="item" />
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon, ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import RegListItem from "@/modules/event/components/statistic/summary/RegListItem.vue";
import { useRoute } from "vue-router";

import { useEventStore } from "@/modules/event/store/index";
import { useAuthStore } from "@/modules/auth/store/index";

const authStore = useAuthStore();

const eventStore = useEventStore();

const route = useRoute();

const eventSummary = computed(() => {
  return eventStore.eventSummary.results;
});

const searchValue = ref();

const eventCashSummary = computed(() => {
  return eventStore.eventCashSummary;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

const isLoading = computed(() => {
  return eventStore.isLoading;
});

onMounted(() => {
  updateSearch(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  const id = route.params.id;
  if (id) {
    eventStore.fetchEventSummary(id, params);
  }
}

const sortOptions = [
  { name: "A-Z", value: "scout_organisation__name", current: false },
  { name: "Neuste", value: "-created_at", current: true },
  { name: "Größte", value: "biggest", current: false },
  { name: "Kleinste", value: "smallest", current: false },
];

const filters = [];
const buttonList = [];
</script>
