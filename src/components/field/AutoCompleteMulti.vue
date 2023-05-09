<template>
  <div :class="`sm:col-span-${cols}`">

    <div>
    <div class="space-y-1">
      <label
        for="add-team-members"
        class="block text-sm font-medium text-gray-700"
        >{{ props.label }}</label
      >
    </div>
      <Multiselect
        :modelValue="modelValue"
        @update:modelValue="onSelectChanged"
        mode="tags"
        :close-on-select="false"
        :searchable="false"
        :create-option="false"
        :options="props.items"
      />
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
  </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
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

const props = defineProps({
  modelValue: { type: Array, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
  cols: { type: Number, required: false, default: 3 },
  items: { type: Array, required: true },
  disabled: { type: Boolean, required: false, default: false },
  lookupListDisplay: { type: Array, required: false, default: ["label"] },
  searchField: { type: Array, required: false, default: ["label"] },
  valueField: { type: String, required: false, default: "value" },
});

const emit = defineEmits(["update:modelValue"]);

const updateSearch = (newValue) => {
  query.value = newValue;
};

function onSelectChanged(value) {
  const result = props.items.filter(item => value.includes(item.value))
  const returnValue = result.map(a => a[props.valueField]);
  emit("update:modelValue", returnValue);
}

const query = ref("");
const filteredPeople = computed(() => {
  return query.value === ""
    ? props.items
    : props.items.filter((item) => {
        const selectedItem = item[props.searchField]
          ? item[props.searchField]
          : item["person"][props.searchField];
        return selectedItem.toLowerCase().includes(query.value.toLowerCase());
      });
});

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function getItemText(item) {
  let template = "";
  props.lookupListDisplay.forEach((field, i) => {
    if (field.charAt(0) === "$") {
      template += field.substring(1, field.length);
    } else if (i === 0) {
      template += item[field];
    } else {
      template = `${template} ${item[field]}`;
    }
  });
  return template;
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>