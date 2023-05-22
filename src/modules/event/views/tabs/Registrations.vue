<template>
  <TabWrapper>
    <!-- Tabs -->
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        @change="onChange($event)"
        v-model="selectedValue"
        class="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        <option
          :value="tab.name"
          v-for="tab in tabs"
          :key="tab.name"
          :selected="selectedValue"
        >
          {{ tab.name }} ({{ tab.count }})
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.linkName"
            :class="[
              tab.current
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
            ]"
          >
            {{ tab.name }}
            <span
              v-if="tab.count"
              :class="[
                tab.current
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-900',
                'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
              ]"
              >{{ tab.count }}</span
            >
          </router-link>
        </nav>
      </div>
    </div>
    <SimpleList
      :items="registrationsFiltered"
      :isLoading="isLoading"
      detailPageLink="RegistrationsDetail"
    >
      <template v-slot:notEmpty="slotProps">
        <RegistrationListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <EventListItemEmpty>
          Du bist bisher bei keiner Veranstaltungen angemeldet.
          Prüfe ob du dich bei einer Veranstaltung anmelden kannst, indem du Einladungen auswählst.
        </EventListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";
import { useTaskStore } from "@/modules/task/store/index";
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import RegistrationListItem from "@/modules/event/components/RegistrationListItem.vue";
import EventListItemEmpty from "@/modules/event/components/EventListItemEmpty.vue";
import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const registrations = computed(() => {
  return eventStore.registrations;
});

const isLoading = computed(() => {
  return eventStore.isLoading;
});

const registrationsFiltered = computed(() => {
  const query = { ...router.currentRoute.value.query };
  return registrations.value.filter((q) => q.status === query.status);
});

const selectedValue = ref("Ausstend");

function onChange(event) {
  const linkName = tabs.value.find((item) => item.name === selectedValue.value)[
    "linkName"
  ];
  router.push(linkName);
}

const tabs = computed(() => {
  const query = { ...router.currentRoute.value.query };
  return [
    {
      name: "Ausstend",
      linkName: { name: "EventRegistrations", query: { status: "pending" } },
      count: registrations.value.filter((q) => q.status === "pending").length,
      current: query.status === "pending",
    },
    {
      name: "Vergangenheit",
      linkName: { name: "EventRegistrations", query: { status: "expired" } },
      count:
        registrations.value.filter((q) => q.status === "expired").length | 0,
      current: query.status === "expired",
    },
  ];
});

import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  eventStore.fetchMyRegistrations();
});
</script>
