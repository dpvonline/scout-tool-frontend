<template>
  <div class="sm:col-span-3">
    <label class="block text-sm font-medium text-gray-700">{{
      props.label
    }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :value="modelValue"
        @input="updateValue"
        type="datetime-local"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
});

const emit = defineEmits(["update:modelValue"]);

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
});

// das hier wandelt eine ISO Zeit in eine ISO Zeit von der jew. Zeitzone um
// const modelValue = computed(() => {
//     if (!props.modelValue) {
//         return '';
//     }
//
//     const date = new Date(props.modelValue)
//     //date.setSeconds(0,0)
//     const tzoffset = (date).getTimezoneOffset() * 60000; //offset in milliseconds
//     const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
//
//     return localISOTime;
// });
const updateValue = (event) => {
    //hier muesste das Datum wieder zurueck umgewandelt werden in die Form, die das Backend mag
  emit("update:modelValue", event.target.value);
};
</script>

<style></style>
