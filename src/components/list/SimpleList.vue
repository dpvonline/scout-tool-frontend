<template>
  <div>
    <ul
      role="list"
      v-if="!isLoading"
      class="
        mt-5
        divide-y divide-gray-200
        border-t border-gray-200
        sm:mt-0 sm:border-t-0
      "
    >
      <li
        v-for="item in myDataList"
        :key="item.id"
        v-if="myDataList && myDataList.length > 0 && !hasError"
      >
        <component
          :is="detailPageLink ? 'router-link' : 'div'"
          :to="{
            name: props.detailPageLink,
            params: {
              id: item.id,
            },
          }"
        >
          <div
            class="
              flex
              items-center
              mx-1
              py-1
              sm:mx-2 sm:py-3
              md:px-4 md:py-6
              sm:px-0
            "
          >
            <div class="flex min-w-0 flex-1 items-center">
              <div class="flex-1">
                <slot name="notEmpty" :item="item"></slot>
              </div>
            </div>
            <div v-if="detailPageLink">
              <ChevronRightIcon
                class="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
            </div>
          </div>
        </component>
      </li>
      <li class="py-5 px-4" v-if="myDataList && myDataList.length === 0 && !hasError">
        <slot name="empty"></slot>
      </li>
      <li class="py-5 px-4" v-if="hasError">
        <slot name="error"></slot>
      </li>
    </ul>
    <LoadingItem v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

import LoadingItem from "@/components/list/LoadingItem.vue";

const props = defineProps({
  items: { type: Array, required: true },
  detailPageLink: { type: String, required: true },
  isLoading: { type: Boolean, required: false, default: false },
  hasError: { type: Boolean, required: false, default: false },
});

const myDataList = computed(() => {
  if (props.items?.results) {
    return props.items?.results;
  }
  return props.items;
});
</script>
