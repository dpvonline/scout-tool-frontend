<template>
  <SmallList
    title="Meine Gruppen"
    :items="myGroups"
    emptyText="Du bist in keiner Gruppe"
    allButton="Alle Gruppen"
    :isLoading="isLoading"
  />
</template>

<script setup lang="ts">
import moment from "moment";
import { computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";

const groupStore = useGroupStore();

const myGroups = computed(() => {
  return groupStore.myGroups;
});

const isLoading = computed(() => {
  return groupStore.isLoading;
});
</script>
