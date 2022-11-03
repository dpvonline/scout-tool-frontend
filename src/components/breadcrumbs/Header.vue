<template>
  <nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex w-full space-x-4 px-4 sm:px-6">
      <li class="flex">
        <div class="flex items-center">
          <button
            @click="$router.go(-1)"
            class="text-gray-400 hover:text-gray-500"
          >
            <ChevronLeftIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          </button>
        </div>
      </li>
      <li v-for="page in props.pages" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg
            class="h-full w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <router-link
            :to="{ name: page.link }"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}</router-link
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  pages: Array,
});
</script>