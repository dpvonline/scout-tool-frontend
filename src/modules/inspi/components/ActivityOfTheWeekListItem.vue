<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props.item.title }}
        </p>
      </div>
      <div>
        <p class="truncate text-sm font-medium text-gray-600">
          {{ props.item.releaseDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClipboardIcon, RocketLaunchIcon, UserIcon, Cog8ToothIcon, BuildingLibraryIcon } from "@heroicons/vue/24/outline";
import moment from "moment";
const props = defineProps({
  item: Object,
});
</script>
