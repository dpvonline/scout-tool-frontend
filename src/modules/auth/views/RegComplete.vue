<template>
  <PageWrapper class="">
  <main class="my-6">
    <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
      <div class="px-4 sm:px-6 md:px-0">
        <h2 class="text-lg font-medium text-gray-900">
          Registrierung beim DPV-Bieber erfolgreich
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Bitte prüfe deine E-Mails und bestätige deinen Account. Danach kannst
          du direkt loslegen.
        </p>
        <CheckCircleIcon
          class="mx-auto h-20 w-20 text-green-600"
          aria-hidden="true"
        />
        <ul
          role="list"
          class="
            mt-6
            divide-y divide-gray-200
            border-t border-b border-gray-200
          "
        >
          <li v-for="(item, itemIdx) in items" :key="itemIdx">
            <div class="group relative flex items-start space-x-3 py-4">
              <div class="flex-shrink-0">
                <span
                  :class="[
                    item.iconColor,
                    'inline-flex items-center justify-center h-10 w-10 rounded-lg',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-gray-900">
                  <router-link :to="{ name: item.href }">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </div>
                <p class="text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
              <div class="flex-shrink-0 self-center">
                <ChevronRightIcon
                  class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
  </PageWrapper>
</template>


<script setup lang="ts">
import PageWrapper from "@/components/base/PageWrapper.vue";

import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import {
  CalendarIcon,
  ArrowRightCircleIcon,
  MegaphoneIcon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

const items = [
  {
    name: "Startseite",
    description: "Zurück zur Startseite",
    href: "home",
    iconColor: "bg-orange-500",
    icon: HomeIcon,
  },
  {
    name: "Hilfe",
    description: "Ich habe ein Problem und suche Hilfe",
    href: "FaqMain",
    iconColor: "bg-red-500",
    icon: MegaphoneIcon,
  },
];
</script>
