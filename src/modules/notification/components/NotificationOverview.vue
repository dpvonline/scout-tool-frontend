<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="
          -ml-4
          -mt-4
          flex flex-wrap
          items-center
          justify-between
          sm:flex-nowrap
        "
      >
        <div class="ml-4 mt-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span
                class="
                  inline-block
                  h-8
                  w-8
                  overflow-hidden
                  rounded-full
                  bg-gray-100
                "
              >
                <BellAlertIcon />
              </span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Ziel:
                {{ props.item.target ? props.item.target.name : "" }}
              </h3>
              <p class="text-sm text-gray-500">
                Kategorie: {{ props.item.targetType }}
              </p>
            </div>
          </div>
        </div>
        <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton
            @click="onReadedClicked(props.item.id)"
            :icon="BellSlashIcon"
            class="mx-0 my-2"
          >
            Als ungelesen markieren
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div v-if="props.item.sender" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pfadfindername</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ props.item.sender.scoutName }} ({{ props.item.sender.username }})
          </dd>
        </div>
        <div v-if="props.item.sender" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">E-Mail</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ props.item.sender.email }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Erhalten am</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              props.item.timestamp
                ? moment(props.item.timestamp).format("llll")
                : ""
            }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ props.item.unread ? "Ungelesen" : "Gelesen" }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Level</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ props.item.level }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

import moment from "moment";
import {
  PaperClipIcon,
  PencilIcon,
  ChatBubbleLeftIcon,
  InboxIcon,
  PhoneIcon,
  EnvelopeIcon,
  BellAlertIcon,
  BellSlashIcon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";

const props = defineProps({
  item: Object,
});

import { useNotificationStore } from "@/modules/notification/store";

import { useRoute } from "vue-router";

const route = useRoute();

const notificationStore = useNotificationStore();

function refresh() {
  notificationStore.fetchNotifications();
  notificationStore.fetchNotificationCount();
  const id = route.params.id;
  if (id) {
    notificationStore.fetchNotification(id);
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

onMounted(() => {
  const id = route.params.id;
  if (id) {
    onUnreadClicked(Number(id));
  }
});
</script>