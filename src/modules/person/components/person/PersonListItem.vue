<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        v-if="props.item.user"
        :class="[
          'bg-red-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <UserPlusIcon  class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <span
      v-if="!props.item.user"
        :class="[
          'bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
      <UserIcon  class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-gray-600">
          {{ props.item.displayName }}
        </p>
        <p
            v-if="
            props.item &&
            props.item.email
          "
            class="truncate text-sm font-medium text-blue-600"
        >
          {{ props.item.email }}
        </p>
        <p v-else
            class="truncate text-sm font-medium text-blue-600"
        >
          Kein Biber-Account verbunden
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ClipboardIcon, RocketLaunchIcon, UserIcon, UserPlusIcon, Cog8ToothIcon, BuildingLibraryIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  item: Object,
});
</script>
