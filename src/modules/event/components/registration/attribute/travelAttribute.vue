<template>
  <div class="sm:col-span-2">
    <dt class="text-md font-medium text-gray-800">
      <div class="flex">
        <div class="flex-none">
          {{ props.data.attributeModule.title }}
        </div>
        <div class="flex-1 w-64">
          <button
            @click="onTravelAttributeNewClicked(props.data)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
          <button
            @click="onTravelAttributeEditClicked(props.data)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </dt>
    <dt class="text-sm font-medium text-gray-500">
      {{ props.data.attributeModule.text }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900">
      {{ props.data.numberPersons }} Personen um
      {{ $dayjs(props.data.dateTimeField).format("llll") }} mit
      {{ props.data.getTypeFieldDisplay }}
    </dd>
    <dd class="mt-1 text-sm text-gray-500">
      {{ props.data.description }}
    </dd>
    <AddTravelModal
      :open="openNewTravelModal"
      :travel="travel"
      :callbackOnConfirm="onNewTravelConfirmClicked"
      :callbackOnCancel="onNewTravelCancelClicked"
    />
  </div>
</template>

<script setup lang="ts">
import AddTravelModal from "@/modules/event/components/registration/AddTravelModal.vue";
import { PencilSquareIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const travel = ref({});

const props = defineProps({
  data: { type: Object, required: true },
});

const openNewTravelModal = ref(false);

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

function onNewTravelClicked() {
  openNewTravelModal.value = true;
  travel.value = props.data;
}

function onTravelAttributeNewClicked() {
  openNewTravelModal.value = true;
  travel.value = {};
}

function onTravelAttributeEditClicked() {
  openNewTravelModal.value = true;
  travel.value = props.data;
}

const travelTypeChoices = computed(() => {
  return eventStore.travelTypeChoices;
});

const event = computed(() => {
  return eventStore.event;
});

const registration = computed(() => {
  return eventStore.registration;
});

async function newTravel(travel) {
  const regId = route.params.id;
  const attributeModuleIdTravel = event.value?.eventmoduleSet.filter(
    (item) => item.name === "Travel"
  )[0].attributeModules[0];

  const data = {
    numberPersons: travel.numberPersons,
    typeField: travel.typeField.value,
    dateTimeField: travel.dateTimeField,
    description: travel.description,
    attributeModule: attributeModuleIdTravel?.id,
  };
  const res = await eventRegisterStore.createAttribute(regId, data, "travel");
  return res;
}

async function updateTravel(travel) {
  const data = {
    id: travel.id,
    numberPersons: travel.numberPersons,
    typeField: travel.typeField.value,
    dateTimeField: travel.dateTimeField,
    description: travel.description,
  };
  const res = await eventRegisterStore.updateAttribute(
    travel.id,
    data,
    "travel"
  );
  return res;
}

async function onNewTravelConfirmClicked(travel) {
  let res = null;
  if (travel.id) {
    let res = await updateTravel(travel);
    if ((res.statusCode = "200") || (res.statusCode = "201")) {
      commonStore.showSuccess("Anreise erfolfreich gespeichert.");
    } else {
      commonStore.showError("Fehler beim Speichern.");
    }
    const id = route.params.id;
    const response = await eventStore.fetchRegistration(id);

    openNewTravelModal.value = false;
  } else {
    let res = await newTravel(travel);
    if ((res.statusCode = "200") || (res.statusCode = "201")) {
      commonStore.showSuccess("Anreise erfolfreich gespeichert.");
    } else {
      commonStore.showError("Fehler beim Speichern.");
    }
    const id = route.params.id;
    const response = await eventStore.fetchRegistration(id);
    openNewTravelModal.value = false;
  }
}

function onNewTravelCancelClicked() {
  openNewTravelModal.value = false;
}

onMounted(async () => {
  const regId = route.params.id;

  await Promise.all([
    eventStore.fetchEvent(registration.value.event.id),
    eventStore.fetchTravelTypeChoices(),
  ]);
});
</script>
