<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[
          'bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <RocketLaunchIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          {{ props.item?.firstName }} {{ props.item?.lastName }}
        </p>
        <p class="truncate text-sm font-medium text-black-600">
          {{ props.item?.bookingOption?.name }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <ClipboardIcon
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          {{ props.item?.scoutOrganisation }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import moment from "moment";
import PrimaryButton from "@/components/button/Primary.vue";

const props = defineProps({
  item: Object,
});
</script>
