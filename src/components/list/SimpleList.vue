<template>
  <ul
    role="list"
    class="
      mt-5
      divide-y divide-gray-200
      border-t border-gray-200
      sm:mt-0 sm:border-t-0
    "
  >
    <li v-for="item in props.items" :key="item.id" v-if="props?.items?.length">
      <router-link
        :to="{
          name: props.detailPageLink,
          params: {
            id: item.id,
          },
        }"
      >
        <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0">
          <div class="flex min-w-0 flex-1 items-center">
            <div class="flex-1">
              <slot name="notEmpty" :item="item"></slot>
            </div>
          </div>
          <div>
            <ChevronRightIcon
              class="h-5 w-5 text-gray-400 group-hover:text-gray-700"
              aria-hidden="true"
            />
          </div>
        </div>
      </router-link>
    </li>
    <li v-else>
      <slot name="empty"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  items: Array,
  detailPageLink: String,
});
</script>
