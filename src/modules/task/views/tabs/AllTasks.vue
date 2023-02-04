<template>
<TabWrapper>
  <SimpleList
    :items="myRequests"
    detailPageLink="TaskDetail"
>
    <template v-slot:notEmpty="slotProps">
      <TaskListItem :item="slotProps.item" />
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
import { useTaskStore } from "@/modules/task/store/index";
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from '@/components/list/SimpleList.vue'
import TabWrapper from '@/components/base/TabWrapper.vue'
import TaskListItem from '@/modules/task/components/TaskListItem.vue'
import EventListItemEmpty from '@/modules/event/components/EventListItemEmpty.vue'

const taskStore = useTaskStore();
const dashboardStore = useDashboardStore();

const myRequests = computed(() => {
  return taskStore.myRequests;
});

onMounted(() => {
  taskStore.fetchMyRequests();
  dashboardStore.fetchMyRequests();
});
</script>
