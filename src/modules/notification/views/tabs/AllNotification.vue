<template>
  <TabWrapper>
    <SimpleList :items="notificationsFiltered" :isLoading="isLoading" detailPageLink="NotificationDetail">
      <template v-slot:notEmpty="slotProps">
        <NotificationListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <EventListItemEmpty>
          Du hast keine Benachrichtigungen
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
      name: "Alle Benachrichtigungen",
      linkName: { name: "AllNotification" },
      count: notifications.value.length,
      current: query.status === 'all',
    },
  ];
});

import { useRouter } from "vue-router";


const router = useRouter();

onMounted(() => {
  notificationsStore.fetchNotifications();
  notificationsStore.fetchNotificationCount();
});
</script>
