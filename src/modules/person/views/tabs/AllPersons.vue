<template>
  <div class="2xl:px-64 xl:px-30">
    <List
      :name="'Mitglieder'"
      :items="persons"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="AllPersons"
      detailPageLink="PersonDetail"
    >
      <template #listitem="{ item }">
        <PersonListItem :item="item"/>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import PersonListItem from '@/modules/group/components/PersonListItem.vue'
import { useRoute } from "vue-router";
import { usepersonStore } from "@/modules/person/store/index.ts";

const personStore = usepersonStore();

const searchValue = ref();

const route = useRoute();

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

const filters = [
];
const buttonList = [];
</script>
