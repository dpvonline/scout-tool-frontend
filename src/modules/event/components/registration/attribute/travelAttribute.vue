<template>
  <div class="sm:col-span-2">
    <dt class="text-md font-medium text-gray-800">
      <div class="flex">
        <div class="flex-none">
          {{ props.data.attributeModule.title }}
        </div>
        <div class="flex-1 w-64">
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

function onTravelAttributeEditClicked() {
  openNewTravelModal.value = true;
  travel.value = props.data;
}

const travelTypeChoices = computed(() => {
  return eventStore.travelTypeChoices;
});

async function onNewTravelConfirmClicked(travel) {
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
  console.log(res);
  if ((res.statusCode = "200")) {
    const id = route.params.id;
    const response = await eventStore.fetchRegistration(id);
    commonStore.showSuccess("Anreise erfolfreich gespeichert.");
  } else {
    commonStore.showError("Fehler beim speichern.");
  }

  openNewTravelModal.value = false;
}

function onNewTravelCancelClicked() {
  openNewTravelModal.value = false;
}

import { PencilSquareIcon } from "@heroicons/vue/24/outline";

onMounted(async () => {
  await Promise.all([eventStore.fetchTravelTypeChoices()]);
});
</script>
