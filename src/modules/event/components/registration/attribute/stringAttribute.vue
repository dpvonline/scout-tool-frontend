<template>
<div>
  <div class="sm:col-span-2">
    <dt class="text-md font-medium text-gray-800">
      <div class="flex">
        <div class="flex-none">
          {{ props.data.attributeModule.title }}
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
      {{ props.data.attributeModule.text }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900">
      {{ props.data.stringField }}
    </dd>
  </div>
      <RegEditOverlay
      :open="openEventEdit"
      :items="itemData"
      @close="onEventClosedClicked"
      header="Event bearbeiten"
      :formNo="eventEditForm"
    />
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  data: { type: Object, required: true },
});

import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import RegEditOverlay from "@/modules/event/components/registration/regEdit/Overlay.vue";

// Overlay
const openEventEdit = ref(false);
const eventEditForm = ref(0);
const itemData = ref({});

function onEventClosedClicked() {
  openEventEdit.value = false;
  itemData.value = {};
}

function onEventEditClicked(formNo, child = null) {
  openEventEdit.value = true;
  eventEditForm.value = formNo;
  if (child === null) {
    itemData.value = props.data;
  }
}


</script>
