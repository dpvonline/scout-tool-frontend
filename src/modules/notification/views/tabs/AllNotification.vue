<template>
  <TabWrapper>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        @change="onChange($event)"
        v-model="selectedValue"
        class="
          mt-4
          block
          w-full
          rounded-md
          border-gray-300
          py-2
          pl-3
          pr-10
          text-base
          focus:border-blue-500 focus:outline-none focus:ring-blue-500
          sm:text-sm
        "
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="selectedValue">
          {{ tab.name }}
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
    <SimpleList :items="notificationsFiltered" :isLoading="isLoading" detailPageLink="NotificationDetail">
      <template v-slot:notEmpty="slotProps">
        <NotificationListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <EventListItemEmpty>
          Glückwunsch. Du bist aktuell keine offenen Aufgaben
        </EventListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import moment from "moment";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";

import { useNotificationStore } from "@/modules/notification/store";

import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import NotificationListItem from "@/modules/notification/components/NotificationListItem.vue";
import EventListItemEmpty from "@/modules/event/components/EventListItemEmpty.vue";

const notificationsStore = useNotificationStore();

const notifications = computed(() => {
  return notificationsStore.notifications
});

const notificationCount = computed(() => {
  return notificationsStore.notificationCount
});

const isLoading = computed(() => {
  return notificationsStore.isLoading
});

const notificationsFiltered = computed(() => {
const query = { ...router.currentRoute.value.query };
  return notificationsStore.notifications.filter(q => q.status === query.status)
});

const selectedValue = ref('all');

function onChange(event) {
  const linkName = tabs.value.find(item => item.name === selectedValue.value)['linkName']
  router.push(linkName)
}

const tabs = computed(() => {
const query = { ...router.currentRoute.value.query };
  return [
    {
      name: "Alle",
      linkName: { name: "AllNotification" },
      count: notifications.value.length,
      current: query.status === 'all',
    },
    // {
    //   name: "Ungelesen",
    //   linkName: { name: "AllNotification", query: { status: "akzeptiert" } },
    //   count: notifications.value.filter(q => q.unread).length | 0,
    //   current: query.status === 'akzeptiert',
    // },
    // {
    //   name: "Gelesen",
    //   linkName: { name: "AllNotification", query: { status: "abgelehnt" } },
    //   count: notifications.value.filter(q => !q.unread).length,
    //   current: query.status === 'abgelehnt',
    // },
  ];
});

import { useRouter } from "vue-router";


const router = useRouter();

onMounted(() => {
  notificationsStore.fetchNotifications();
  notificationsStore.fetchNotificationCount();
});
</script>
