<template>
  <div class="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
    <dt class="text-sm font-medium text-gray-500">{{ props.label }}</dt>
    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      {{ props.value }}
    </dd>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
});
</script>
