<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <span
        :class="[getColorByStatus(props.item.status),
          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <RocketLaunchIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </span>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="truncate text-sm font-medium text-blue-600">
          Von: {{ props.item.user.scoutName }} ({{ props.item.user.email }})
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          für Gruppe: 
          <span class="ml-2 truncate">{{ props.item.group.name }}</span>
        </p>
      </div>
      <div class="hidden md:block">
        <div>
          <p class="text-sm text-gray-900">
            Antrag gestellt:
            {{ moment(props.item.createdAt).format("llll") }}
          </p>
          <p class="text-gray-400 mt-2 flex items-center text-sm">
            <CheckCircleIcon
              class="mr-1.5 h-5 w-5 flex-shrink-0"
              :class="[getIconColorByStatus(props.item.status)]"
              aria-hidden="true"
            />
            {{ props.item.status }}
            <span class="px-1" v-if="props.item.checkedBy">
             von 
            </span> 
            {{ props.item.checkedBy ? props.item.checkedBy.username : ''}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClipboardIcon, RocketLaunchIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import moment from "moment";

function getColorByStatus(status) {
  switch (status) {
    case 'abgelehnt': {
      return "bg-red-400";
      break;
    }
    case 'akzeptiert': {
      return "bg-green-400";
      break;
    }
    case 'offen': {
      return "bg-yellow-500";
      break;
    }
    default: {
      return "bg-gray-400";
      break;
    }
  }
}
function getIconColorByStatus(status) {
  switch (status) {
    case 'abgelehnt': {
      return "text-red-400";
      break;
    }
    case 'akzeptiert': {
      return "text-green-400";
      break;
    }
    case 'offen': {
      return "text-yellow-500";
      break;
    }
    default: {
      return "text-gray-400";
      break;
    }
  }
}

const props = defineProps({
  item: Object,
});
</script>
