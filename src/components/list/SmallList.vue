<template>
  <section aria-labelledby="recent-hires-title" >
    <div class="overflow-hidden rounded-lg bg-gray-50 shadow" v-if="!props.isLoading">
      <div class="p-6">
        <div class="border-b border-gray-400 px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ props.title }}
          </h3>
          <!-- <p class="mt-1 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.</p> -->
        </div>
        <div class="my-6 flow-root">
          <ul role="list" class="-my-5 divide-y divide-gray-200">
            <li
              v-for="person in props.items"
              :key="person.handle"
              v-if="props.items.length > 0"
              class="py-4"
            >
              <div class="flex items-center space-x-4">
                <slot name="item" :item="person"></slot>
              </div>
            </li>
            <li v-else class="my-5">
              <div class="flex items-center mx-8 space-x-4">
                <p>{{ props.emptyText }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="pt-6 border-t border-gray-400">
          <div
            class="
              justify-stretch
              mt-6
              flex flex-col-reverse
              space-y-4 space-y-reverse
              sm:flex-row-reverse
              sm:justify-end
              sm:space-y-0
              sm:space-x-3
              sm:space-x-reverse
              md:mt-0 md:flex-row md:space-x-3
            "
          >
            <button
              @click="onLinkButtonClicked"
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                rounded-md
                border border-transparent
                bg-blue-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                shadow-sm
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                focus:ring-offset-gray-100
              "
            >
              {{ props.allButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Laden...
    </div>
  </section>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/button/Primary.vue";

const props = defineProps({
  title: String,
  items: Array,
  emptyText: String,
  allButton: String,
  isLoading: Boolean,
  allLinkButtonName: String,
});

import { useRouter } from "vue-router"

const router = useRouter()

function onLinkButtonClicked() {
  router.push({ name: props.allLinkButtonName })
}
</script>
