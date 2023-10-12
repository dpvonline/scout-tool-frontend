<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <InvitationDetailList :event="event" v-if="!isLoading" />
      <LoadingItem v-else />
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import InvitationDetailList from "@/modules/event/components/invitation/DetailList.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import ListItem from "@/modules/task/components/TaskListItem.vue";
import ListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

const route = useRoute();

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

const registerPerson = computed(() => {
  return eventRegisterStore.registerPerson;
});

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

const event = computed(() => {
  return eventStore.event;
});

const isLoading = computed(() => {
  return !event.value.id
});
const pages = [
  {
    name: "Alle Einladungen",
    link: { name: "EventInvitations", query: { status: "pending" } },
  },
];

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    eventStore.fetchEvent(id);
  }
});
</script>