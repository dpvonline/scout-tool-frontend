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
          {{ props.item.name }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <ClipboardIcon
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span class="truncate">{{ props.item.shortDescription }}</span>
        </p>
      </div>
      <div class="hidden md:block">
        <div>
          <p class="text-sm text-gray-900">
            von
            {{ moment(props.item.startDate).format("DD.MM.YYYY") }}
            bis
            {{ moment(props.item.endDate).format("DD.MM.YYYY") }}
          </p>
          <!-- <p class="mt-2 flex items-center text-sm text-gray-500">
            <CheckCircleIcon
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
              aria-hidden="true"
            />
            Anmeldung möglich:
            {{
              props.item.registrationOptions.allowEditSingleReg ? "Ja" : "Nein"
            }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClipboardIcon, RocketLaunchIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import moment from "moment";
const props = defineProps({
  item: Object,
});
</script>
