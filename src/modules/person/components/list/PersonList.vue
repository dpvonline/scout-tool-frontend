<template>
  <List
    :name="'Mitglieder'"
    :items="persons"
    :searchValue="searchValue"
    :sortOptions="sortOptions"
    :filters="filters"
    :buttonList="buttonList"
    mainPageLink="AllPersons"
    :isLoading="isLoading"
  >
    <template #listitem="{ item }">
      <PersonListItem :item="item" />
    </template>
  </List>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import PersonListItem from "@/modules/person/components/person/PersonListItem.vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/modules/person/store/index.ts";

const personStore = usePersonStore();

const searchValue = ref();

const route = useRoute();

const isLoading = computed(() => {
  return personStore.isLoading;
});

const persons = computed(() => {
  return personStore.persons;
});

onMounted(() => {
  personStore.fetchPersons(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  personStore.fetchPersons(params);
}

const sortOptions = [
  { name: "A-Z", value: "alpha", current: true },
  { name: "Neuste", value: "-created_at", current: false },
];

const filters = [];
const buttonList = [];
</script>
