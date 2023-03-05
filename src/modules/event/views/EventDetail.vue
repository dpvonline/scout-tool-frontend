<template>
  <TabWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <EventDetailList :event="event" v-if="!isLoading"/>
      <LoadingItem v-else/>
    </main>
  </TabWrapper>
</template>

<script setup lang="ts">
import EventDetailList from "@/modules/event/components/EventDetailList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import ListItem from "@/modules/task/components/TaskListItem.vue";
import ListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const event = computed(() => {
  return eventStore.event;
});

const isLoading = computed(() => {
  return eventStore.isLoading;
});
const pages = [{ name: "Alle Events", link: "EventMain" }];

onMounted(() => {
  const id = route.params.id;
  if (id) {
    eventStore.fetchEvent(id);
  }
});
</script>