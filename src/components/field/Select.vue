<template>
  <Combobox
    :disabled="disabled"
    as="div"
    :modelValue="modelValue"
    @update:modelValue="onSelectChanged"
    by="id"
  >
    <ComboboxLabel
      class="block text-sm font-medium"
      :class="disabled ? 'text-gray-400' : 'text-gray-700'"
      >{{ props.label }}</ComboboxLabel
    >
    <div class="relative mt-1">
      <ComboboxInput
        :disabled="disabled"
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        @change="updateSearch($event.target.value)"
        :display-value="(person: SelectOption) => person?.name"
      />
      <ComboboxButton
        :disabled="disabled"
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredPeople.length > 0"
        :disabled="disabled"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="person in filteredPeople"
          :key="person.id"
          :value="person"
          :disabled="disabled"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-blue-600 text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person.name }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-blue-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

interface SelectOption {
  id: number;
  unavailable?: boolean;
  name: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: SelectOption;
    errors?: any[];
    label: string;
    hint?: string;
    cols?: number;
    items: SelectOption[];
    disabled?: boolean;
  }>(),
  {
    errors: [],
    hint: "",
    cols: 3,
    disabled: false,
  }
);

const emit = defineEmits(["update:modelValue"]);

const updateSearch = (newValue: string) => {
  query.value = newValue;
};

function onSelectChanged(value: SelectOption) {
  emit("update:modelValue", value);
}

const query = ref("");
const filteredPeople = computed(() => {
  return query.value === ""
    ? props.items
    : props.items.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase());
      });
});
</script>
