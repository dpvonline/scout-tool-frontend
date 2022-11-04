<template>
  <h2> Übersicht </h2>
  <p> {{ group }} </p>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index.ts";

import { useRoute } from "vue-router";

const route = useRoute();

const groupStore = useGroupStore();
const group = computed(() => {
  return groupStore.group;
});

</script>

<style>

</style>