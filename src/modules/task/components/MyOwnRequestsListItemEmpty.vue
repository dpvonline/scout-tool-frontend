<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-green-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <ExclamationTriangleIcon
          class="h-5 w-5 text-white"
          aria-hidden="true"
        />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <slot />
      </div>
      <div class="hidden md:block"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardIcon,
  RocketLaunchIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
</script>
