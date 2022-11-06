<template>
  <div class="h-full" >
    <div class="flex flex-1 flex-col 2xl:pa-64">
      <main class="relative h-screen flex-1 pb-8 overflow-y-auto" >
        <div class="mt-8">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-medium leading-6 text-gray-900">
              Zusammenfassung
            </h2>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <!-- Card -->
              <div
                v-for="card in cards"
                :key="card.name"
                class="overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <component
                        :is="card.icon"
                        class="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="truncate text-sm font-medium text-gray-500">
                          {{ card.name }}
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ card.amount }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <div class="text-sm">
                    <router-link
                      :to="{ name: card.href }"
                      class="font-medium text-blue-700 hover:text-blue-900"
                      >Anzeigen</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NotifyList />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ScaleIcon, UserGroupIcon, UserIcon } from "@heroicons/vue/24/outline";

import NotifyList from "@/modules/dashboard/components/NotifyList.vue";

const cards = computed(() => {
  return [
    {
      name: "Mitglieder",
      href: "GroupMain",
      icon: UserIcon,
      amount: 453,
    },
    {
      name: "Gruppen",
      href: "GroupMain",
      icon: UserGroupIcon, 
      amount: 74,
    },
  ];
});

onMounted(() => {
});
</script>