<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <RegistrationDetailList v-if="!isLoading" :registration="registration" />
      <LoadingItem v-else />
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import RegistrationDetailList from "@/modules/event/components/registration/DetailList.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import ListItem from "@/modules/task/components/TaskListItem.vue";
import ListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();

const eventStore = useEventStore();

const route = useRoute();

const registration = computed(() => {
  return eventStore.registration;
});

const isLoading = ref(false);
const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  const response = await eventStore.fetchRegistration(id);
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    eventRegisterStore.fetchAllMappings(response?.data?.event?.id),
    eventStore.fetchBookingOptionsById(response?.data?.event?.id),
  ]);
  isLoading.value = false;
});
</script>
