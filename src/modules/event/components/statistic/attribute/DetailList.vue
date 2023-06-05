<template>
  <div>
    <div>
      <fieldset class="my-4 mx-2">
        <legend class="sr-only">Notification method</legend>
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div v-for="type in types" :key="type.id" class="flex items-center">
            <input
              :id="type.id"
              name="notification-method"
              type="radio"
              :checked="type.id === picked"
              :value="type.id"
              v-model="picked"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label
              :for="type.id"
              class="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >{{ type.title }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
      <SimpleList :items="eventAttributesSummary" :isLoading="isLoading">
        <template v-slot:notEmpty="slotProps">
          <component
            :is="picked === 'travel' ? TravelItem : FreeTextItem"
            :item="slotProps.item" 
          />
        </template>
        <template v-slot:empty>
          Keine Anreisen bisher
        </template>
      </SimpleList>
  </div>
</template>

<script setup lang='ts'>
import SimpleList from "@/components/list/SimpleList.vue";
import TravelItem from "@/modules/event/components/statistic/attribute/list/TravelItem.vue";
import FreeTextItem from "@/modules/event/components/statistic/attribute/list/FreeTextItem.vue";
import { defineComponent, onMounted, ref, computed } from "vue";

// 

const types = [
  { id: "travel", title: "Anreise" },
  { id: "freeText", title: "Zusätzliche Anmerkung" },
];

const picked = ref("travel");

const eventAttributesSummary = computed(() => {
  debugger;
  if (picked.value === "travel") {
    return getAttributeByName(eventStore.eventAttributesSummary, 'Travel')
  }
  if (picked.value === "freeText") {
    return getAttributeByName(eventStore.eventAttributesSummary, 'Letter')
  }
  return [];
});

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();

function getAttributeByName(list, name) {

let setName = ''
  try {
    if (name === 'Travel') {
      setName = 'travelattributeSet'
    }
    if (name === 'Letter') {
      setName = 'stringattributeSet'
    }

    const filtered = list.filter(item => item.name === name)[0].attributeModules[0][setName]

    return filtered
  }
  catch(err) {
    return []
  }
}

onMounted(() => {
  const eventId = route.params.id;
  eventStore.fetchAttributesSummary(eventId);
});
</script>
