<template>
  <div :class="`sm:col-span-${props.cols}`">
    <label for="price" class="block text-sm font-medium text-gray-700">{{
      props.label
    }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :value="modelValue"
        @input="updateValue"
        type="text"
        name="price"
        id="price"
        oninput="this.value = this.value.replace(/[^0-9,]/g, '').replace(/(\..*)\,/g, '$1');"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        placeholder="0.00"
        aria-describedby="price-currency"
        :class="
          !hasError
            ? 'border-gray-300'
            : 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500'
        "
      />
      <div
        class="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          flex
          items-center
          pr-3
        "
      >
        <span class="text-gray-500 sm:text-sm" id="price-currency">Euro</span>
      </div>
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
    <p
      v-if="props.hint"
      class="mt-2 text-sm text-gray-500"
      id="email-description"
    >
      {{ props.hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";

import { useCurrencyInput } from "vue-currency-input";
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  modelValue: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: "" },
  cols: { type: Number, required: false, default: 3 },
  options: { type: Object, required: true},
});

const { inputRef } = useCurrencyInput(props.options);
const emit = defineEmits(["update:modelValue"]);

const hasError = computed(() => {
  return props.errors[0] && props.errors.length;
});

function cleanCurrency(value) {
  let returnValue = value.replace('.', ',').trim()
  // returnValue =  returnValue.replace(new RegExp("^[1-9][\.\d]*(,\d+)?$"), '')
  return returnValue;
}

const updateValue = (event) => {
  const value = event.target.value;
  emit("update:modelValue", cleanCurrency(value))
};

</script>