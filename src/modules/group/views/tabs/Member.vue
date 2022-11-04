<template>
  <p> {{ groupMembers }} </p>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";

import { useRoute } from "vue-router";

const route = useRoute();

const groupStore = useGroupStore();
const groupMembers = computed(() => {
  return groupStore.groupMembers;
});

onMounted(() => {
  const id = route.params.id;
  groupStore.fetchGroupMembersById(id);
});
</script>

<style>

</style>