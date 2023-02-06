<template>
  <div class="flex space-x-3">
    <!-- <div class="flex-shrink-0">
      <span
        :class="[
          getColorByProcessed(item.isProcessed),
          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
        ]"
      >
        <component
          :is="getIconByMessageType(item.messageType.id)"
          class="h-5 w-5 text-white"
          aria-hidden="true"
        />
      </span>
    </div>
    <div>
      <div class="text-sm">
        <div class="font-medium text-gray-600">
          {{
            item.createdByEmail
              ? `Extern: ${item.createdByEmail}`
              : `${item?.createdBy?.scoutName} (${item?.createdBy?.username})`
          }}
        </div>
      </div>
      <div class="text-sm">
        <div class="pt-1 text-sm font-medium text-gray-900">
          {{ item.subject }}
        </div>
      </div>
      <div class="mt-1 text-sm text-gray-700">
        <p>{{ item.messageBody }}</p>
      </div>
      <div class="mt-2 space-x-2 text-sm">
        <span class="font-medium text-gray-800"
          >vor {{ -moment(item.createdAt).diff(moment(), "days") }} Tagen</span
        >
        <span class="font-medium text-gray-500">{{
          moment(item.createdAt).format("llll")
        }}</span>
        <span class="font-medium text-gray-500">&middot;</span>
        <span class="font-medium text-gray-400">
          {{ item.messageType.name }}
        </span>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import {
//   TagIcon,
//   BugAntIcon,
//   ArrowTrendingUpIcon,
//   CheckCircleIcon,
// } from "@heroicons/vue/20/solid";
// import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
// import moment from "moment";
// const props = defineProps({
//   item: Object,
// });

// function getColorByProcessed(isProcessed) {
//   switch (isProcessed) {
//     case true: {
//       return "bg-green-500";
//       break;
//     }
//     case false: {
//       return "bg-red-500";
//       break;
//     }
//     default: {
//       return "bg-black-400";
//       break;
//     }
//   }
// }

// function getIconByMessageType(id) {
//   switch (id) {
//     case 1: {
//       return BugAntIcon;
//       break;
//     }
//     case 2: {
//       return ArrowTrendingUpIcon;
//       break;
//     }
//     case 4: {
//       return QuestionMarkCircleIcon;
//       break;
//     }
//     case 5: {
//       return TagIcon;
//       break;
//     }
//     default: {
//       return QuestionMarkCircleIcon;
//       break;
//     }
//   }
// }
</script>
