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

import { useAuthStore } from "@/modules/auth/store/index";

import PrimaryButton from "@/components/button/Primary.vue";

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

const bookingOptions = computed(() => {
  return eventStore.bookingOptions;
});

const eatHabitMappings = computed(() => {
  return registerStore.eatHabitMappings.filter((item) => item.public === true);
});

const route = useRoute();

const authStore = useAuthStore();

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

const booking_option_options = computed(() => {
  if (eventStore.bookingOptions && eventStore.bookingOptions.length) {
    let arr = JSON.parse(
      JSON.stringify(
        eventStore.bookingOptions
      )
    );
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["name"];
      data["checked"] = false;
      delete data["id"];
      delete data["name"];
    });
    return arr;
  } else {
    return [];
  }
});

const eat_habits_options = computed(() => {
  if (registerStore.eatHabitMappings && registerStore.eatHabitMappings.length) {
    let arr = JSON.parse(
      JSON.stringify(
        registerStore.eatHabitMappings.filter((item) => item.public === true)
      )
    );
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["name"];
      data["checked"] = false;
      delete data["id"];
      delete data["name"];
    });
    return arr;
  } else {
    return [];
  }
});
// { value: "1", label: "Verbesserungsvorschlag", checked: false },
const filters = computed(() => {
  return [
    {
      id: "booking_option__id",
      name: "Buchungsoption",
      options: booking_option_options.value,
    },
    {
      id: "eat_habit__id",
      name: "Essen",
      options: eat_habits_options.value,
    },
  ];
});

const buttonList = [];

onMounted(async () => {
  const id = route.params.id;
  await Promise.all([
    registerStore.fetchAllMappings(),
    eventStore.fetchBookingOptionsById(id),
  ]);
});
</script>
