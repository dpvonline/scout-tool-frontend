<template>
  <component
    class="pa-3"
    :is="components[props.component]"
    :label="props.label"
    :hint="props.hint"
    :modelValue="modelValue"
    @input="updateValue"
    @update:modelValue="updateValueDirekt"
    :errors="props.errors"
  ></component>
</template>

<script setup lang="ts">
import Text from "@/components/field/Text.vue";
import TextArea from "@/components/field/TextArea.vue";
import Number from "@/components/field/Number.vue";
import Radio from "@/components/field/Radio.vue";
import Toggle from "@/components/field/Toggle.vue";
import Select from "@/components/field/Select.vue";
import Date from "@/components/field/Date.vue";
import PhoneNumber from "./PhoneNumber.vue";
import ZIP from "./ZIP.vue";
import EMail from "./EMail.vue";
import Password from "@/components/field/Password.vue";
import { ErrorObject } from "@vuelidate/core";

const components = {
  Text,
  TextArea,
  Number,
  Radio,
  Toggle,
  Select,
  Date,
  PhoneNumber,
  ZIP,
  EMail,
  Password
};

// I do NOT want to use [CompA, CompA] because my inputs are strings
const componentTreeName = [
  "Text",
  "TextArea",
  "Number",
  "Radio",
  "Toggle",
  "Select",
  "Date",
  "PhoneNumber",
  "ZIP",
  "EMail",
  "Password",
];
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const updateValueDirekt = (event: Event) => {
  emit("update:modelValue", event);
};

const props = withDefaults(defineProps<{
  modelValue: any,
  errors?: ErrorObject[],
  techName: string,
  component: keyof typeof components,
  label: string,
  hint?: string
}>(), {
  hint: "",
  errors: [],
})
</script>

<style></style>
