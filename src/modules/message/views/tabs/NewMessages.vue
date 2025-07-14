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
        <option v-for="tab in tabs" :key="tab.name" :value="tab.name" :selected="selectedValue">
          {{ tab.name }} ({{tab.count}})
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
      :items="currentIssues"
      :isLoading="isLoading"
      detailPageLink="MessageDetail"
    >
      <template v-slot:notEmpty="slotProps">
        <IssueListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <MessageListItemEmpty> Du hast keine Nachrichten </MessageListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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
import IssueListItem from "@/modules/message/components/IssueListItem.vue";
import MessageListItemEmpty from "@/modules/message/components/MessageListItemEmpty.vue";

const dashboardStore = useDashboardStore();

const issues = computed(() => {
  return messageStore.issues;
});
const currentIssues = computed(() => {
const query = { ...router.currentRoute.value.query };
  return messageStore.issues.filter(q => q.status == query.status)
});

// const newMessagesFiltered = computed(() => {
// const query = { ...router.currentRoute.value.query };
//   return messageStore.messages;
// });

const selectedValue = ref('Neu');

function onChange(event) {
  const linkName = tabs.value.find(item => item.name === selectedValue.value)['linkName']
  router.push(linkName)
}

const tabs = computed(() => {
const query = { ...router.currentRoute.value.query };
  return [
    {
      name: "Neu",
      linkName: { name: "NewMessages", query: { status: 'unread' } },
      count: issues.value.filter(q => q.status === 'unread').length,
      current: query?.status === 'unread',
    },
    {
      name: "In Bearbeitung",
      linkName: { name: "NewMessages", query: { status: 'wip' } },
      count: issues.value.filter(q => q.status === 'wip').length,
      current: query?.status === 'wip',
    },
    {
      name: "Fertig",
      linkName: { name: "NewMessages", query: { status: 'success' } },
      count: issues.value.filter(q => q.status === 'success').length,
      current: query?.status === 'success',
    },
    {
      name: "Nicht Lösbar",
      linkName: { name: "NewMessages", query: { status: 'failed' } },
      count: issues.value.filter(q => q.status === 'failed').length,
      current: query?.status === 'failed',
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
  messageStore.fetchIssues();
  const query = { ...router.currentRoute.value.query };

  if (query && !query.status) {
    const linkName = tabs.value.find(item => item.name === 'Neu')['linkName']
    router.push(linkName)
  }

});
</script>
