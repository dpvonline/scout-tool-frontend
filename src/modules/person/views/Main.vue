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
      name: "Meine Stammesmitglieder",
      linkName: { name: "AllPersons" },
      current: route.name === "AllPersons",
    },
    {
      name: "Alle Personen",
      linkName: { name: "AllUsers" },
      current: route.name === "AllUsers",
    },
  ];
});
</script>
