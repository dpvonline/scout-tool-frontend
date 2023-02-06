<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <UserIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          Name: {{ props.item.person.scoutName }} ({{ props.item.person.firstName }} {{ props.item.person.lastName }})
        </p>
        <p class="truncate text-sm font-medium text-gray-400">
          Stamm: {{ props.item.person.scoutGroup.name }} ({{ props.item.person.scoutGroup.bund }})
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
