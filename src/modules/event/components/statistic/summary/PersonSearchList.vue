<template>
  <div>
    <List
      :name="'Alle Personen'"
      :items="eventPersonsSummary"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="EventStatisticPersons"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <PersonListItem :item="item" />
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon, ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import PersonListItem from "@/modules/event/components/statistic/summary/PersonListItem.vue";
import { useRoute } from "vue-router";

import { useEventStore } from "@/modules/event/store/index";
import { useAuthStore } from "@/modules/auth/store/index";

const authStore = useAuthStore();

const eventStore = useEventStore();

const route = useRoute();

const eventCashSummary = computed(() => {
  if (eventStore.eventCashSummary && eventStore.eventCashSummary.length) {
    return eventStore.eventCashSummary[0].registrationSet;
  }
  return [];
});

const searchValue = ref();

const eventPersonsSummary = computed(() => {
  return eventStore.eventPersonsSummary.results;
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
    eventStore.fetchPersonsSummary(id, params);
  }
}

const sortOptions = [
  { name: "Neuste", value: "-created_at", current: false },
  // { name: "A-Z", value: "alpha", current: false },
];

const filters = [
  // {
  //   id: "booking_option__name",
  //   name: "Nachrichten Typ",
  //   options: [
  //     { value: "28", label: "Verbesserungsvorschlag", checked: false },
  //     { value: "2", label: "Fehlermeldung", checked: false },
  //     { value: "4", label: "Frage Allgemein", checked: false },
  //   ],
  // },
  // {
  //   id: "is_processed",
  //   name: "Status",
  //   options: [
  //     { value: "True", label: "Bearbeitet", checked: false },
  //     { value: "False", label: "Nicht Bearbeitet", checked: false },
  //   ],
  // },
];
const buttonList = [];
</script>
