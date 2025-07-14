<template>
  <div>
    <PrimaryButton
      color="green"
      @click="onNewRegClicked"
      :icon="PlusIcon"
      class="mx-3 my-3"
    >
      Anmeldung hinzufügen
    </PrimaryButton>
    <PrimaryButton
      color="blue"
      @click="onRegMergeClicked"
      :icon="FolderOpenIcon"
      class="mx-3 my-3"
    >
      Anmeldungen zusammenfassen
    </PrimaryButton>
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
    <RegMergeOverlay
      :open="openRegMerge"
      @close="onRegClosedClicked"
      header="Zusammenfassen"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import List from "@/components/base/list/Main.vue";
import RegListItem from "@/modules/event/components/statistic/summary/RegListItem.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import RegMergeOverlay from "@/modules/event/components/statistic/summary/regMerge/Overlay.vue";

import { useEventStore } from "@/modules/event/store/index";

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();
const eventStore = useEventStore();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const eventSummary = computed(() => {
  return eventStore.eventSummary;
});

const searchValue = ref();

const isLoading = computed(() => {
  return eventStore.isLoading;
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
    eventStore.fetchEvent(id);
  }
}

const sortOptions = [
  { name: "Neuste", value: "-created_at", current: false },
  { name: "A-Z", value: "scout_organisation__name", current: false },
  { name: "Älteste", value: "created_at", current: false },
];

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

const filters = [
{
      id: "scout-organisation",
      name: "Organisation",
      options: scout_hierarchy_options.value,
    },
];
const buttonList = [];

// Registrierung zusammenfügen
function onRegMergeClicked() {
  openRegMerge.value = true;
}
function onRegClosedClicked() {
  openRegMerge.value = false;
}
const openRegMerge = ref(false);

function onNewRegClicked() {
  const eventId = route.params.id;
  eventRegisterStore.$reset();

  const moduleId = eventStore.event?.eventmoduleSet?.find(
    (a) => a.name == "Introduction"
  )?.id;

  router.push({
    name: "RegistrationIntroduction",
    params: {
      id: eventId,
      module: moduleId,
    },
  });
}
</script>
