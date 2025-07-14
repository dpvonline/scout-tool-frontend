<template>
  <SmallList
    title="Meine Aufgaben"
    :items="myRequests"
    emptyText="Keine offenen Aufgaben"
    allButton="Zu dem Aufgaben"
    :isLoading="isLoading"
    allLinkButtonName="AllTasks"
  >
    <template v-slot:item="props">
      <p>
        Antrag: {{ props.item.user.scoutName }} in {{ props.item.group.name }} 
      </p>
    </template>
  </SmallList>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const eventOverviews = computed(() => {
  return eventStore.eventOverviews;
});

import { useTaskStore } from "@/modules/task/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import TaskListItem from "@/modules/task/components/TaskListItem.vue";
import EventListItemEmpty from "@/modules/event/components/EventListItemEmpty.vue";

const taskStore = useTaskStore();

const myRequests = computed(() => {
  return taskStore.myRequests;
});

const isLoading = computed(() => {
  return taskStore.isLoading;
});

onMounted(() => {
  taskStore.fetchMyRequests();
});
</script>
