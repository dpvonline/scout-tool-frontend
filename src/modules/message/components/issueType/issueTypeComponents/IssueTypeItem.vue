<template>
  <div class="flex space-x-3">
    <div>
      <div class="text-md">
        <div class="font-medium text-gray-600">
          {{ item.name }}
        </div>
      </div>
      <div class="text-sm">
        <div class="pt-1 text-sm font-medium text-gray-900">
          {{ item.description }}
        </div>
      </div>
      <div class="mt-1 text-sm text-gray-700">
        <span
          v-for="group in item.responsableGroups"
          :key="group.id"
          class="inline-flex mx-1 items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
          >
          {{ group.name }}
        </span>
      </div>
      <div class="mt-2 space-x-2 text-sm">
        {{ item.isPublic ? 'Öffentlich' : 'Nicht öffentlich' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TagIcon,
  BugAntIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
const props = defineProps({
  item: Object,
});

function getColorByProcessed(isProcessed) {
  switch (isProcessed) {
    case true: {
      return "bg-green-500";
      break;
    }
    case false: {
      return "bg-red-500";
      break;
    }
    default: {
      return "bg-black-400";
      break;
    }
  }
}

function getIconByissueType(id) {
  switch (id) {
    case 1: {
      return BugAntIcon;
      break;
    }
    case 2: {
      return ArrowTrendingUpIcon;
      break;
    }
    case 4: {
      return QuestionMarkCircleIcon;
      break;
    }
    case 5: {
      return TagIcon;
      break;
    }
    default: {
      return QuestionMarkCircleIcon;
      break;
    }
  }
}
</script>
