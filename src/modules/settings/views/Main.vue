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
      name: "Über mich",
      linkName: { name: 'SettingsGeneral'},
      current: route.name === "SettingsGeneral" || route.name === "SettingsGeneralEdit" 
    },
    // { name: "Passwort", linkName: "SettingsPassword", current: route.name === "SettingsPassword" },
    // { name: "Meine Anträge", linkName: "SettingsNotifications", current: route.name === "SettingsNotifications" },
  ];
});

</script>
