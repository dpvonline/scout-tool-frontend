<template>
  <PageWrapper>
    <MyTabGroup :tabs="tabs" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MyTabGroup from "@/components/menu/TabGroup.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";

const route = useRoute();

const tabs = computed(() => {
  return [
    {
      name: "Issues",
      linkName: { name: "NewMessages", query: { status: 'unread' } },
      current: route.name === "NewMessages",
    },
    {
      name: "Nachrichten durchsuchen",
      linkName: { name: "AllMessages" },
      current: route.name === "AllMessages",
    },
    {
      name: "Nachricht Typen",
      linkName: { name: "IssueTypes" },
      current: route.name === "IssueTypes",
    },
  ];
});
</script>
