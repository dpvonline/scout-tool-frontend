<template>
  <div>
    <div v-if="!isLoading" class="px-3 py-3">
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Essenbesonderheiten
      </h3>
      <BaseField
        component="Select"
        :label="'Filter nach einer Registrierung'"
        techName="selectedReg"
        v-model="state.selectedReg"
        :cols="6"
        :items="eventSummary"
        hint="Wähle eine Registrierung falls du nur eine Registrierung sehen willst."
        :lookupListDisplay="['scoutOrganisationDisplay', 'responsible_persons_extended']"
      />
      <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">Gesamt</dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ eventSummaryTotalParticipants }}
          </dd>
        </div>
      </dl>

      <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="item in eventFoodSummary"
          :key="item.name"
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500">
            {{ item.food }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ item.sum }}
          </dd>
        </div>
      </dl>

      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Altersstruktur
      </h3>
      <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            Wölfling (bis 12 Jahre)
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ eventAgeGroupsSummary?.woelfling }}
          </dd>
        </div>
        <div
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            Pfadfinder (12-15 Jahre)
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ eventAgeGroupsSummary?.pfadfinder }}
          </dd>
        </div>
        <div
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            Rover (16-24 Jahre)
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ eventAgeGroupsSummary?.rover }}
          </dd>
        </div>
        <div
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            Alt-Rover (ab 25 Jahre)
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ eventAgeGroupsSummary?.altRover }}
          </dd>
        </div>
      </dl>
    </div>
    <LoadingItem v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import BaseField from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import RegSearchList from "@/modules/event/components/statistic/summary/RegSearchList.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import { required } from "@vuelidate/validators";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute } from "vue-router";
import registration from "@/modules/event/services/registration";

import { useRouter } from "vue-router";
const router = useRouter();

const isLoading = ref(false);

const route = useRoute();

const state = reactive({
  selectedReg: null,
});

const eventFoodSummary = computed(() => {
  return eventStore.eventFoodSummary;
});

const eventAgeGroupsSummary = computed(() => {
  return eventStore.eventAgeGroupsSummary;
});

const eventSummaryTotalParticipants = computed(() => {
  return eventStore.eventSummaryTotalParticipants;
});

const eventSummary = computed(() => {
  return eventStore.eventSummary?.results;
});

watch(
  () => route.query,
  () => {
    queryUpdated(route.query);
  },
  { immediate: true, deep: true }
);

watch(
  () => state.selectedReg,
  (newValue) => {
    router.push({
      name: "EventStatisticResults",
      query: { regId: newValue.id },
    });
    state.selectedReg = newValue;
  }
);

function queryUpdated(query: any) {
  const eventId = route.params.id;
  eventStore.fetchFoodSummary(eventId, query);
  eventStore.fetchAgeGroupsSummary(eventId, query);
  eventStore.fetchEventSummary(eventId).then(() => {
    if (query?.regId && eventSummary?.value) {
      state.selectedReg = eventSummary.value.find(
        (a) => a["id"] === query.regId
      );
    }
  });
}

onMounted(async () => {
  isLoading.value = true;
  const eventId = route.params.id;
  const regId = route.params.id;
  const params = null;
  const responses = await Promise.all([
    eventStore.fetchFoodSummary(eventId, params),
    eventStore.fetchEventSummaryTotalParticipants(eventId),
    eventStore.fetchAgeGroupsSummary(eventId, params),
    eventStore.fetchEventSummary(eventId),
  ]);
  isLoading.value = false;
});
</script>
