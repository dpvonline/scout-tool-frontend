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
      detailPageLink="RegistrationsDetail"
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

import { useRouter } from "vue-router";
const router = useRouter();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();

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

const eventPersonsSummary = ref([]);

const isAuth = computed(() => {
  return authStore.isAuth;
});

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const isLoading = ref(false);

onMounted(() => {
  // updateSearch(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

async function updateSearch(params: any) {
  const id = route.params.id;
  if (id && !isLoading.value) {
    isLoading.value = true;
    try {
      const response = await eventStore.fetchPersonsSummary(id, params);
      if (response?.data) {
        eventPersonsSummary.value = response?.data;
      } else {
        throw new Error("No data found!");
      }
    } catch (error) {
      eventPersonsSummary.value = [];
      router.replace({ query: {} })
    } finally {
      isLoading.value = false;
    }
  }
}

const sortOptions = [
  { name: "Neuste Anmeldungen", value: "-created_at", current: true },
  { name: "Ersten Anmeldungen", value: "created_at", current: false },
  { name: "Vorname", value: "first_name", current: false },
  { name: "Nachname", value: "last_name", current: false },
  { name: "Jüngste zuerst", value: "-birthday", current: false },
  { name: "Älteste zuerst", value: "birthday", current: false },
];

const booking_option_options = computed(() => {
  if (eventStore.bookingOptions && eventStore.bookingOptions.length) {
    let arr = JSON.parse(JSON.stringify(eventStore.bookingOptions));
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

const scout_hierarchy_options = computed(() => {
  if (
    eventRegisterStore.scoutHierarchy &&
    eventRegisterStore.scoutHierarchy.length
  ) {
    let arr = JSON.parse(JSON.stringify(eventRegisterStore.scoutHierarchy));
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["displayName"];
      data["checked"] = false;
      delete data["id"];
      delete data["displayName"];
    });
    return arr;
  } else {
    return [];
  }
});
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
    {
      id: "scout-organisation",
      name: "Organisation",
      options: scout_hierarchy_options.value,
    },
  ];
});

const buttonList = [];

onMounted(async () => {
  const id = route.params.id;
  await Promise.all([
    registerStore.fetchAllMappings(),
    eventStore.fetchBookingOptionsById(id),
    eventRegisterStore.fetchScoutHierarchy(),
  ]);
});
</script>
