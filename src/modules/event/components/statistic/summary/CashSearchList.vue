<template>
  <div>
    <List
      :name="'Alle Anmeldungen'"
      :items="eventCashSummary"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="EventStatisticPayments"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <CashListItem :item="item" />
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon, ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import CashListItem from "@/modules/event/components/statistic/summary/CashListItem.vue";
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

const groups = computed(() => {
  return eventStore.groups;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

const isLoading = computed(() => {
  return false;
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
    eventStore.fetchCashSummary(id, params);
  }
}

const sortOptions = [];

const filters = [];
const buttonList = [];
</script>
