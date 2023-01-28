<template>
  <div :class="`sm:col-span-${cols}`">
    <label for="first-name" class="block text-sm font-medium text-gray-700">{{
      props.label
    }}</label>
    <div class="mt-1">
      <input
        :value="modelValue"
        @input="updateValue"
        type="number"
        pattern="[0-9]+([\,|\.][0-9]+)?"
        step="1"
        class="
          block
          w-full
          rounded-md
          border-gray-300
          shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          sm:text-sm
        "
      />
    </div>
    <p class="mt-2 text-sm text-red-500" id="email-description">
      {{ props.errors[0] && props.errors[0].$message }}
    </p>
    <p class="mt-2 text-sm text-gray-500">
      {{ props.hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  modelValue: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: null },
  cols: { type: Number, required: false, default: 3 },
});

const emit = defineEmits(["update:modelValue"]);

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style>
</style>