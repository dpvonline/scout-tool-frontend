<template>
  <ReadOnlyPerson :editable="true" :personalData="personalData" />
</template>

<script setup lang="ts">
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { PencilIcon } from "@heroicons/vue/20/solid";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from "@/modules/person/components/list/ReadOnlyPerson.vue";

const personalDataStore = usePersonalDataStore();

const route = useRoute();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

onMounted(() => {
  personalDataStore.fetchPersonalData();
});
</script>
