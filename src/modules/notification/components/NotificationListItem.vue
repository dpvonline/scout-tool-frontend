<template>
  <div class="flex min-w-0 flex-1 items-center">
    <div class="flex-shrink-0">
      <button
        type="button"
        class="rounded-full w-8 h-8"
        :class="[props.item.unread ? 'bg-green-600' : 'bg-gray-600']"
      >
        <BellAlertIcon class="px-2 py-2 text-white" />
      </button>
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div>
        <p class="text-sm font-medium line-clamp text-indigo-600">
          {{ props.item.targetType }} - {{ props.item.target?.name }}
        </p>
        <p class="mt-2 flex items-center text-sm text-gray-500">
          <UserIcon
            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span class="truncate line-clamp-1"
            >von {{ props.item.sender.scoutName }} ({{
              props.item.sender.email
            }})</span
          >
        </p>
      </div>
      <div class="hidden md:block">
        <div>
          <p class="text-sm text-gray-900 mt-2 space-x-2 text-sm">
            <span class="font-medium text-gray-800"
              >vor
              {{ -moment(props.item.timestamp).diff(moment(), "days") }}
              Tagen</span
            >
            <span class="font-medium text-gray-500">{{
              moment(props.item.timestamp).format("llll")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TagIcon,
  BugAntIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  BellAlertIcon,
  BellSlashIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/vue/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import moment from "moment";

const props = defineProps({
  item: Object,
});

import { useNotificationStore } from "@/modules/notification/store";

const notificationStore = useNotificationStore();

function onItemClicked(item) {
  if (item.unread) {
    onUnreadClicked(item.id);
  } else {
    onReadedClicked(item.id);
  }
}

function onUnreadClicked(id: number) {
  notificationStore.markAsRead(id).then(() => {
    refresh();
  });
}

function onReadedClicked(id) {
  notificationStore.markAsUnread(id).then(() => {
    refresh();
  });
}

function refresh() {
  notificationStore.fetchNotifications();
  notificationStore.fetchNotificationCount();
}
</script>