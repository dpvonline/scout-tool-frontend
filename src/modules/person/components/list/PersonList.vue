<template>
  <List
    :name="'Mitglieder'"
    :items="persons"
    :searchValue="searchValue"
    :sortOptions="sortOptions"
    :filters="filters"
    :buttonList="buttonList"
    mainPageLink="AllPersons"
    detailPageLink="PersonDetails"
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
import {XMarkIcon} from "@heroicons/vue/24/outline";

const personStore = usePersonStore();

const searchValue = ref();

const route = useRoute();

const persons = ref()
const isLoading = ref(true);

onMounted(() => {
  updateSearch(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params: any) {
  isLoading.value = true;
  personStore.fetchPersons(params).then((response) => {
    persons.value = response.data;
    isLoading.value = false;
  });
}

const sortOptions = [
  { name: "A-Z", value: "alpha", current: true },
  { name: "Neuste", value: "-created_at", current: false },
];

const filters = [];
const buttonList = [{ name: "Personen per Excel importieren", linkName: "newExcel" }];
</script>
