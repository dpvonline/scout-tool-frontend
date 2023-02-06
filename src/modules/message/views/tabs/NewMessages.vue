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
    <SimpleList :items="newMessagesFiltered" :isLoading="isLoading" detailPageLink="MessageDetail">
      <template v-slot:notEmpty="slotProps">
        <MessageListItem :item="slotProps.item"/>
      </template>
      <template v-slot:empty>
        <MessageListItemEmpty>
          Du hast keine Nachrichten
        </MessageListItemEmpty>
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
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import MessageListItem from "@/modules/message/components/MessageListItem.vue";

const dashboardStore = useDashboardStore();

const newMessages = computed(() => {
  return messageStore.messages.filter(q => !q.isProcessed)
});
const newMessagesFiltered = computed(() => {
const query = { ...router.currentRoute.value.query };
  return messageStore.messages.filter(q => !q.isProcessed).filter(q => q.messageType.id == query.message_type)
});

const selectedValue = ref('Offen');

function onChange(event) {
  const linkName = tabs.value.find(item => item.name === selectedValue.value)['linkName']
  router.push(linkName)
}

const tabs = computed(() => {
const query = { ...router.currentRoute.value.query };
console.log(query.message_type);
  return [
    {
      name: "Vorschlag",
      linkName: { name: "NewMessages", query: { message_type: 1 } },
      count: newMessages.value.filter(q => q.messageType.id === 1).length,
      current: query?.message_type === '1',
    },
    {
      name: "Fehler",
      linkName: { name: "NewMessages", query: { message_type: 2 } },
      count: newMessages.value.filter(q => q.messageType.id === 2).length,
      current: query?.message_type === '2',
    },
    {
      name: "Rechtsschreibfehler",
      linkName: { name: "NewMessages", query: { message_type: 3 } },
      count: newMessages.value.filter(q => q.messageType.id === 3).length,
      current: query?.message_type === '3',
    },
    {
      name: "Frage",
      linkName: { name: "NewMessages", query: { message_type: 4 } },
      count: newMessages.value.filter(q => q.messageType.id === 4).length,
      current: query?.message_type === '4',
    },
    {
      name: "Veranstaltung",
      linkName: { name: "NewMessages", query: { message_type: 5 } },
      count: newMessages.value.filter(q => q.messageType.id === 5).length,
      current: query?.message_type === '5',
    },
    {
      name: "Mitmachen",
      linkName: { name: "NewMessages", query: { message_type: 6 } },
      count: newMessages.value.filter(q => q.messageType.id === 6).length,
      current: query?.message_type === '6',
    },
  ];
});

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useMessageStore } from "@/modules/message/store";

const router = useRouter();

const messageStore = useMessageStore();

const searchValue = ref();

const route = useRoute();

const isLoading = computed(() => {
  return messageStore.isLoading;
});



onMounted(() => {
  messageStore.fetchMessages();
});
</script>
