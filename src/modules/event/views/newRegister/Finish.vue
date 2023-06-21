<template>
  <PageWrapper class="">
    <main class="my-6 mx-4">
      <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
        <div class="px-4 sm:px-6 md:px-0">
          <h2 class="text-lg font-medium text-gray-900">
            Deine Anmeldung ist erfolgreich abgeschlossen
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Du hast eine Bestätigungs E-Mail bekommen. Dort sind alle Details
            zusammengefasst.
          </p>
          <CheckCircleIcon
            class="mx-auto h-20 w-20 text-green-600"
            aria-hidden="true"
          />
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Zusammenfassung
          </h3>
          <dl class="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Deine Anmeldezahl
              </dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ registration?.participantCount }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Deine Kosten</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ registration?.price?.toFixed(2) }}
                €
              </dd>
            </div>
          </dl>
          <div class="border-b border-gray-200 my-2" />
          <RatingRegistration />
          <ul
            role="list"
            class="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200"
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
                    <router-link :to="item.href">
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
import RatingRegistration from "@/modules/event/components/finish/Rating.vue";
import { reactive, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import {
  CalendarIcon,
  ArrowRightCircleIcon,
  MegaphoneIcon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

const items = computed(() => {
  return [
    {
      name: "Deine Anmeldung",
      description: "Nochmal ansehen und bearbeiten",
      href: {
        name: "RegistrationsDetail",
        params: { id: registration?.value?.id || 0 },
      },
      iconColor: "bg-orange-500",
      icon: HomeIcon,
    },
    {
      name: "Ich suche Hilfe",
      description: "Ich habe ein Problem und suche Hilfe",
      href: { name: "MessageNew2" },
      iconColor: "bg-red-500",
      icon: MegaphoneIcon,
    },
  ];
});

const registration = computed(() => {
  return eventStore.registration;
});

const isLoading = ref(false);

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  const response = await eventStore.fetchRegistration(id);
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    eventRegisterStore.fetchAllMappings(response?.data?.event?.id),
  ]);
});
</script>
