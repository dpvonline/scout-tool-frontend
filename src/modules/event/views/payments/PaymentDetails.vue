<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      {{ event }}
      <!-- <EventPaymentDetailList :payments="payments" v-if="!isLoading" /> -->
      <LoadingItem />
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import EventDetailList from "@/modules/event/components/EventDetailList.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import ListItem from "@/modules/task/components/TaskListItem.vue";
import ListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

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


const pages = [
  // {
  //   name: "Alle Zahlungen",
  //   link: { name: "EventStatisticPayments", params: {id: '6' }},
  // },
];

onMounted(() => {
  const id = route.params.id;
  if (id) {
    // eventStore.fetchEventPaymentsById(id);
  }
});
</script>