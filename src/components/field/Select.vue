<template>
<div :class="`sm:col-span-${cols}`">
  <Listbox
    as="div"
    :disabled="disabled"
    :modelValue="modelValue"
    @update:modelValue="onSelectChanged"
  >
    <ListboxLabel class="block text-sm font-medium" :class="disabled ? 'text-gray-400' : 'text-gray-700'">{{
      label
    }}</ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        :disabled="disabled"
        class="
          relative
          w-full
          cursor-default
          rounded-md
          bg-white
          py-2
          pl-3
          pr-10
          border
          text-left
          shadow-sm
          focus:border-green-500
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          sm:text-sm
        "
        :class="!hasError? 'border-gray-300' : 'border-red-500 placeholder-red-300 focus:border-red-500'"
      >
        <span class="block truncate">{{
          modelValue?.name ? modelValue?.name : "Bitte Auwahl treffen"
        }}</span>
        <span
          class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
          "
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            max-h-60
            w-full
            overflow-auto
            rounded-md
            bg-white
            py-1
            text-base
            shadow-lg
            ring-1 ring-black ring-opacity-5
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="person in filteredPeople"
            :key="person.id"
            :value="person"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-blue-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ person?.name }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <p class="mt-2 text-sm text-red-500" id="email-description">
      {{ props.errors[0] && props.errors[0].$message }}
    </p>
    <p
      v-if="props.hint"
      class="mt-2 text-sm text-gray-500"
      id="email-description"
    >
      {{ props.hint }}
    </p>
  </Listbox>
</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  modelValue: { type: Number, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
  cols: { type: Number, required: false, default: 3 },
  items: { type: Array, required: true },
  disabled: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const updateSearch = (newValue) => {
  query.value = newValue;
};

function onSelectChanged(value) {
  emit("update:modelValue", value);
}

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
})

const query = ref("");
const filteredPeople = computed(() => {
  return query.value === ""
    ? props.items
    : props.items.filter((item) => {
        return item?.name.toLowerCase().includes(query.value.toLowerCase());
      });
});
</script>