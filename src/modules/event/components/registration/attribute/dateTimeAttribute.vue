<template>
  <div class="sm:col-span-2">
    <dt class="text-md font-medium text-gray-800">
      <div class="flex">
        <div class="flex-none">
          <p class="text-sm font-medium text-gray-800">
            {{ props.data?.title }}
          </p>
        </div>
        <div class="flex-1 w-64">
          <button
            @click="onEventEditClicked(0)"
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
      {{ props.data?.text }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900">
      {{ $dayjs(props.value?.dateTimeField).format("llll") }}
      
    </dd>
    <RegEditOverlay
      :open="openEventEdit"
      :items="itemData"
      :value="valueData"
      @close="onEventClosedClicked"
      header="Wert bearbeiten"
      :formNo="eventEditForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  data: { type: Object, required: true },
  value: { type: String, required: false },
});

import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import RegEditOverlay from "@/modules/event/components/registration/regEdit/Overlay.vue";

// Overlay
const openEventEdit = ref(false);
const eventEditForm = ref(0);
const itemData = ref({});
const valueData = ref({});

function onEventClosedClicked() {
  openEventEdit.value = false;
  itemData.value = {};
}

function onEventEditClicked() {
  openEventEdit.value = true;
  itemData.value = props.data;
  valueData.value = props.value;
}
</script>
