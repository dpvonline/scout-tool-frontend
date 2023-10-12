<template>
  <div>
    <div>
      <fieldset class="my-4 mx-2">
        <legend class="sr-only">Notification method</legend>
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div
            v-for="typeItem in types"
            :key="typeItem.id"
            class="flex items-center mx-2"
          >
            <input
              :id="typeItem.id"
              name="notification-method"
              type="radio"
              :checked="typeItem.id === picked"
              :value="typeItem.id"
              v-model="picked"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label
              :for="typeItem.id"
              class="ml-1 block text-sm font-medium leading-6 text-gray-900"
              >{{ typeItem.header }}</label
            >
          </div>
        </div>
        <div
          v-if="picked"
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div
            v-for="attribute in selectedAttributeModules"
            :key="attribute.id"
            class="flex items-center mx-2"
          >
            <input
              :id="attribute.id"
              name="notification-method"
              type="radio"
              :checked="attribute.id === pickedAttribute"
              :value="attribute.id"
              v-model="pickedAttribute"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label
              :for="attribute.id"
              class="ml-1 block text-sm font-medium leading-6 text-gray-900"
              >{{ attribute.title }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
    <SimpleList :items="eventAttributesSummary" :isLoading="isLoading">
      <template v-slot:notEmpty="slotProps">
        <component
          :is="components[getComponentType(slotProps?.item?.type)]"
          :item="slotProps.item"
        />
      </template>
      <template v-slot:empty> Keine Anreisen bisher </template>
    </SimpleList>
  </div>
</template>

<script setup lang='ts'>
import SimpleList from "@/components/list/SimpleList.vue";
import TravelItem from "@/modules/event/components/statistic/attribute/list/TravelItem.vue";
import BooleanItem from "@/modules/event/components/statistic/attribute/list/BooleanItem.vue";
import StringItem from "@/modules/event/components/statistic/attribute/list/StringItem.vue";
import NumberItem from "@/modules/event/components/statistic/attribute/list/NumberItem.vue";
import { defineComponent, onMounted, ref, computed } from "vue";

const isLoading = ref(false);

const components = {
  TravelItem,
  BooleanItem,
  StringItem,
  NumberItem,
};

const types = computed(() => {
  return eventStore.eventAttributesSummary;
});

const selectedAttributeModules = computed(() => {
  try {
    return types?.value?.find((item) => item.id === picked.value)
      .attributeModules;
  } catch (err) {
    return [];
  }
});

const picked = ref(null);
const pickedAttribute = ref(null);

const eventAttributesSummary = computed(() => {
  if (picked.value && pickedAttribute.value) {
    return getAttributeByName(
      eventStore.eventAttributesSummary,
      picked.value,
      pickedAttribute.value
    );
  }
  return [];
});

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();

function getComponentType(fieldType: string) {
  console.log(fieldType);
  switch (fieldType) {
    case "booleanAttribute":
      return "BooleanItem";
    case "dateTimeAttribute":
      return "DateTimeItem";
    case "integerAttribute":
      return "NumberItem";
    case "floatAttribute":
      return "NumberItem";
    case "stringAttribute":
      return "StringItem";
    case "travelAttribute":
      return "TravelItem";
    default: {
      return "";
    }
  }
}

function getAttributeByName(list, picked, pickedAttribute) {
  let setName = "";
  try {
    const filtered = list.find((item) => item.id === picked);
    const filtered2 = filtered.attributeModules.find(
      (item) => item.id === pickedAttribute
    ).attributeSet;
    return filtered2;
  } catch (err) {
    return [];
  }
}

onMounted(() => {
  const eventId = route.params.id;
  eventStore.fetchAttributesSummary(eventId);
});
</script>
