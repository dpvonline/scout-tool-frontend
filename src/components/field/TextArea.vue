<template>
  <div class="sm:col-span-3">
    <label for="about" class="block text-sm font-medium text-gray-700">{{
      props.label
    }}</label>
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <textarea
        :value="props.modelValue"
        @input="updateValue"
        name="about"
        rows="3"
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="
          !hasError
            ? 'border-gray-300'
            : 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500'
        "
      />
      <div
        v-if="hasError"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
      <p class="mt-2 text-sm text-red-500">
        {{ props.errors[0] && props.errors[0].$message }}
      </p>
      <p v-if="props.hint" class="mt-2 text-sm text-gray-500">
        {{ props.hint }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  modelValue: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
});

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
