<template>
  <button
    @click="onButtonClicked"
    type="button"
    :disabled="isLoading"
    class="
      inline-flex
      items-center
      rounded
      border border-gray-300
      bg-white
      px-2.5
      py-1.5
      text-xs
      font-medium
      text-gray-700
      shadow-sm
      hover:bg-gray-50
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
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
      class="ml-1 mr-2 h-5 w-5 text-white"
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
  icon: { type: Object, required: false, default: null },
});

const emit = defineEmits(["click"]);

const onButtonClicked = () => {
  emit("click");
};
</script>