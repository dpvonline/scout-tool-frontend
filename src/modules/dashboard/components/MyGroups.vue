<template>
  <SmallList
    title="Meine Gruppen"
    :items="myGroups"
    emptyText="Du bist in keiner Gruppe"
    allButton="Zu den Gruppen"
    :isLoading="isLoading"
    allLinkButtonName="MyGroups"
  >
    <template v-slot:item="props">
      <p>
        {{ props.item.name }} ({{ props.item.parent.name }})
      </p>
    </template>
  </SmallList>
</template>

<script setup lang="ts">
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
