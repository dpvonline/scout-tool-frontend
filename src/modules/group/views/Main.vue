<template>
    <PageWrapper>
      <MyTabGroup :tabs="tabs"/>
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
      name: "Meine Gruppen",
      linkName: {name: "MyGroups" },
      current:
        route.name === "MyGroups",
    },
    {
      name: "Gruppe suchen",
      linkName: {name: "GroupSearch" },
      current:
        route.name === "GroupSearch",
    },
  ];
});
</script>
