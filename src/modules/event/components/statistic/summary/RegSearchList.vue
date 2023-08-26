<template>
  <div>
    <PrimaryButton
      color="green"
      @click="onNewRegClicked"
      :icon="PlusIcon"
      class="mx-3 my-3"
      >Anmeldung hinzufügen</PrimaryButton
    >
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
import {
  TagIcon,
  ChevronRightIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import RegListItem from "@/modules/event/components/statistic/summary/RegListItem.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { useEventStore } from "@/modules/event/store/index";
import { useAuthStore } from "@/modules/auth/store/index";

const authStore = useAuthStore();

const eventStore = useEventStore();

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();

function onNewRegClicked() {
  const eventId = route.params.id;
  eventRegisterStore.$reset();

  router.push({
    name: "RegistrationIntroduction",
    params: {
      id: eventId,
    },
  });
}
</script>
