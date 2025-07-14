<template>
  <button
    @click="onButtonClicked"
    type="button"
    :disabled="isLoading || disabled"
    class="inline-flex items-center justify-center rounded-md border border-transparent py-2 px-4 text-xs font-medium text-white shadow-sm"
    :class="
      isLoading || disabled
        ? `bg-blue-300 focus:outline-none bg-blue-500`
        : `focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 hover:bg-${color}-700 bg-${color}-600`
    "
  >
    <ArrowPathIcon
      v-if="isLoading"
      class="animate-spin -ml-0.5 mr-2 h-4 w-4"
      aria-hidden="true"
    />
    <component
      v-if="props.icon"
      :is="props.icon"
      class="h-4 w-4 text-white"
      :class="props.label !== '' ? '-ml-1 mr-2' : ''"
      aria-hidden="true"
    />
    {{ props.label }}
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  label: { type: String, required: false },
  isLoading: { type: Boolean, required: false },
  color: { type: String, required: false, default: "blue" },
  icon: { type: Function, required: false, default: null },
  disabled: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["click"]);

const onButtonClicked = () => {
  emit("click");
};
</script>