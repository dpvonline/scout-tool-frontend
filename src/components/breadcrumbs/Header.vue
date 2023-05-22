<template>
  <nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
    <div class="flex items-center p-1">
      <button @click="$router.go(-1)" class="text-gray-300 hover:text-gray-300">
        <ChevronLeftIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      </button>
    </div>
    <ol role="list" class="mx-auto flex w-full space-x-4 sm:px-4 sm:px-6">
      <li v-for="page in props.pages" :key="page.name" class="flex py-1">
        <div class="flex items-center">
          <svg
            class="h-full w-2 md:w-6 wflex-shrink-0 font-bold text-gray-300"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <router-link
            v-if="props.pages.length > 1"
            :to="{ ...page.link, params: { id: page.id } }"
            class="
              ml-2
              sn:ml-4
              text-sm
              md:text-md
              font-medium
              text-gray-500
              hover:text-gray-700
              w-max-[200px]
            "
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}
          </router-link>
          <router-link
            v-else
            :to="{ ...page.link, params: { id: page.id } }"
            class="
              ml-1
              md:ml-4
              text-md
              font-medium
              text-gray-500
              hover:text-gray-700
            "
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  pages: Array,
});
</script>