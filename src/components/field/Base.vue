<template>
  <component
    class="px-1 pt-2"
    :is="components[props.component]"
    :label="props.label"
    :hint="props.hint"
    :modelValue="modelValue"
    @input="updateValue"
    @update:modelValue="updateValueDirekt"
    @updateSearch="updateSearch"
    :errors="props.errors"
    :cols="props.cols"
    :lookupListDisplay="props.lookupListDisplay"
    :searchField="props.searchField"
  ></component>
</template>

<script setup lang="ts">
import Text from "@/components/field/Text.vue";
import AutoComplete from "@/components/field/AutoComplete.vue";
import AutoCompleteRemote from "@/components/field/AutoCompleteRemote.vue";
import TextArea from "@/components/field/TextArea.vue";
import Number from "@/components/field/Number.vue";
import Radio from "@/components/field/Radio.vue";
import Toggle from "@/components/field/Toggle.vue";
import Select from "@/components/field/Select.vue";
import Date from "@/components/field/Date.vue";
import DateTime from "@/components/field/DateTime.vue";
import PhoneNumber from "./PhoneNumber.vue";
import ZIP from "./ZIP.vue";
import EMail from "./EMail.vue";
import Password from "@/components/field/Password.vue";
import MultiSelect from "@/components/field/MultiSelect.vue";
import { ErrorObject } from "@vuelidate/core";

const components = {
  AutoComplete,
  AutoCompleteRemote,
  Text,
  TextArea,
  Number,
  Radio,
  Toggle,
  Select,
  Date,
  DateTime,
  PhoneNumber,
  ZIP,
  EMail,
  Password,
  MultiSelect,
};

// I do NOT want to use [CompA, CompA] because my inputs are strings
const componentTreeName = [
  "AutoComplete",
  "AutoCompleteRemote",
  "Text",
  "TextArea",
  "Number",
  "Radio",
  "Toggle",
  "Select",
  "Date",
  "DateTime",
  "PhoneNumber",
  "ZIP",
  "EMail",
  "Password",
  "MultiSelect",
];
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const updateValueDirekt = (event: Event) => {
  emit("update:modelValue", event);
};

function updateSearch(newValue: string) {
  emit('updateSearch', newValue);
};

const props = withDefaults(
  defineProps<{
    modelValue: any;
    errors?: ErrorObject[];
    techName: string;
    component: keyof typeof components;
    label: string;
    hint?: string;
    cols?: Number;
    lookupListDisplay?: String[];
    searchField?: String[];
  }>(),
  {
    hint: "",
    errors: [],
  }
);
</script>
