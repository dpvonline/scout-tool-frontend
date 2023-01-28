<template>
  <div class="2xl:px-64 xl:px-30">
    <List
      :name="'Mitglieder'"
      :items="persons"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="PersonMain"
      detailPageLink="PersonDetails"
    >
      <template #listitem="{ item }">
        <div class="flex min-w-0 flex-1 items-center">
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
              <p class="truncate text-sm font-medium text-gray-800">
                {{ item.person.scoutName }}
              </p>
              <p class="truncate text-sm font-medium text-gray-800">
                {{ item.person.firstName }} {{ item.person.lastName }}
              </p>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
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
const buttonList = [{ name: "Neue Person", linkName: "" }];
</script>
