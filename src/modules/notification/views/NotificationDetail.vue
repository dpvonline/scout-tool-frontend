
<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <NotificationOverview :item="notification" v-if="!isLoading"/>
      <LoadingItem v-else/>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import NotificationOverview from '@/modules/notification/components/NotificationOverview.vue'
import PageWrapper from "@/components/base/PageWrapper.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import { useRoute } from "vue-router";
const route = useRoute();
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useNotificationStore } from "@/modules/notification/store";

const notificationsStore = useNotificationStore();

const notification = computed(() => {
  return notificationsStore.notification
});

const isLoading = computed(() => {
  return notificationsStore.isLoading
});

import { ref, watch, onMounted, computed } from "vue";

const pages = [{ name: "Alle", link: "AllNotification" }];

function refreshData() {
  const id = route.params.id;
  if (id) {
    notificationsStore.fetchNotification(id);
  }
}

onMounted(() => {
  refreshData();
});

</script>
