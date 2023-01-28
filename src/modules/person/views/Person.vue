<template>
  <ReadOnlyPerson :personalData="personalData" class="py-3 px-3"/>
</template>

<script setup lang="ts">
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from '@/modules/person/components/list/ReadOnlyPerson.vue'

const personalDataStore = usePersonalDataStore();

const route = useRoute();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

onMounted(() => {
  const id = route.params.id;
  personalDataStore.fetchPersonalData();
});

</script>
