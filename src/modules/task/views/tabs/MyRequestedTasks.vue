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
    <SimpleList :items="myRequestsFiltered" :isLoading="isLoading" detailPageLink="TaskDetail">
      <template v-slot:notEmpty="slotProps">
        <MyOwnRequestsListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <MyOwnRequestsListItemEmpty>
          Glückwunsch. Du bist aktuell keine offenen Aufgaben
        </MyOwnRequestsListItemEmpty>
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
import { useTaskStore } from "@/modules/task/store/index";
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import MyOwnRequestsListItem from "@/modules/task/components/MyOwnRequestsListItem.vue";
import MyOwnRequestsListItemEmpty from "@/modules/task/components/MyOwnRequestsListItemEmpty.vue";

const taskStore = useTaskStore();
const dashboardStore = useDashboardStore();

const isLoading = computed(() => {
  return taskStore.isLoading
});

const myRequests = computed(() => {
  return taskStore.myOwnRequests;
});
const myRequestsFiltered = computed(() => {
  const query = { ...router.currentRoute.value.query };
  return taskStore.myOwnRequests.filter((q) => q.status === query.status);
});

const selectedValue = ref("Offen");

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
      name: "Offen",
      linkName: { name: "MyRequestedTasks", query: { status: "offen" } },
      count: myRequests.value.filter((q) => q.status === "offen").length,
      current: query.status === "offen",
    },
    {
      name: "Genemigt",
      linkName: { name: "MyRequestedTasks", query: { status: "akzeptiert" } },
      count:
        myRequests.value.filter((q) => q.status === "akzeptiert").length | 0,
      current: query.status === "akzeptiert",
    },
    {
      name: "Abgeleht",
      linkName: { name: "MyRequestedTasks", query: { status: "abgelehnt" } },
      count: myRequests.value.filter((q) => q.status === "abgelehnt").length,
      current: query.status === "abgelehnt",
    },
  ];
});

import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  taskStore.fetchMyRequests();
  dashboardStore.fetchMyRequests();
  taskStore.fetchMyOwnRequests();
});
</script>
