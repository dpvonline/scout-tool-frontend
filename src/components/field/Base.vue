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

const components = { Text, TextArea, Number, Radio, Toggle, Select };

// I do NOT want to use [CompA, CompA] because my inputs are strings
const componentTreeName = ["Text", "TextArea", "Number", "Radio", "Toggle", "Select"];
const emit = defineEmits(['update:modelValue'])
const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

const updateValueDirekt = (event) => {
    emit('update:modelValue', event)
}

const props = defineProps({
  modelValue: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  techName: { type: String, required: true },
  component: { type: String, required: true },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
});
</script>

<style>
</style>