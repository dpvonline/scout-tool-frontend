<template>
  <div class="px-4 sm:px-6 py-3 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Von dir gestellten Anträge</h1>
        <p class="mt-2 text-sm text-gray-700">
          In dieser Liste sind alle deine Anträge dargestellt.
        </p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
    <SimpleList :items="myOwnRequests" detailPageLink="TaskDetail">
      <template v-slot:notEmpty="slotProps">
        <MyOwnRequestsListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <MyOwnRequestsListItemEmpty>
          Glückwunsch. Du bist aktuell keine offenen Aufgaben
        </MyOwnRequestsListItemEmpty>
      </template>
    </SimpleList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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
import MyOwnRequestsListItem from "@/modules/task/components/MyOwnRequestsListItem.vue"
import MyOwnRequestsListItemEmpty from "@/modules/task/components/MyOwnRequestsListItemEmpty.vue"

const taskStore = useTaskStore();

const myOwnRequests = computed(() => {
  return taskStore.myOwnRequests;
});

onMounted(() => {
  taskStore.fetchMyOwnRequests();
});
</script>