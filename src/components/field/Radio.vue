<template>
  <div :class="`sm:col-span-${cols}`">
    <label class="text-base font-medium text-gray-900">{{ props.label }}</label>
    <p class="text-sm leading-5 text-gray-500">{{ props.hint }}</p>
    <fieldset @change="test" class="mt-4">
      <div class="space-y-4">
        <div
          v-for="choice in choices"
          :key="choice.id"
          class="flex items-center"
        >
          <input
            :id="choice.id"
            :value="choice.id"
            type="radio"
            :checked="isSelected(choice)"
            class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            :for="choice.id"
            class="ml-3 block text-sm font-medium text-gray-700"
            >{{ choice.title }}</label
          >
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, required: true },
  errors: { type: Array, required: false, default: [] },
  label: { type: String, required: true },
  hint: { type: String, required: false, default: null },
  choices: { type: Array, required: true },
});

const isSelected = (item) => {
  return item.id === props.modelValue;
};
</script>