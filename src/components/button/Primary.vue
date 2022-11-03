<template>
  <button
    @click="onButtonClicked"
    type="button"
    :disabled="isLoading"
    class="
      inline-flex
      justify-center
      rounded-md
      border border-transparent
      py-2
      px-4
      text-sm
      font-medium
      text-white
      shadow-sm
    "
    :class="
      isLoading
        ? `px-8 py-3 text-white bg-${color}-300 rounded focus:outline-none bg-${color}-600`
        : `focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 hover:bg-${color}-700 bg-${color}-600`
    "
  >
    <ArrowPathIcon
      v-if="isLoading"
      class="animate-spin -ml-0.5 mr-2 h-4 w-4"
      aria-hidden="true"
    />
    {{ props.label }}
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  label: { type: String, required: false },
  isLoading: { type: Boolean, required: false },
  color: { type: String, required: false, default: "blue" },
});

const emit = defineEmits(["click"]);

const onButtonClicked = () => {
  emit("click");
};
</script>