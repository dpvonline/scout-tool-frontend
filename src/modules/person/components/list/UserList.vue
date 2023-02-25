<template>
    <List
      :name="'User'"
      :items="users"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="AllUsers"
      :isLoading="isLoading"
    >
      <template #listitem="{ item }">
        <UserListItem :item="item" />
      </template>
    </List>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import UserListItem from "@/modules/person/components/user/UserListItem.vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/modules/person/store/index.ts";

const personStore = usePersonStore();

const searchValue = ref();

const route = useRoute();

const isLoading = computed(() => {
  return personStore.isLoading;
});

const users = computed(() => {
  return personStore.users;
});

onMounted(() => {
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  personStore.fetchUsers(params);
}

const sortOptions = [
  { name: "A-Z", value: "alpha", current: true },
  { name: "Neuste", value: "-created_at", current: false },
];

const filters = [];
const buttonList = [];
</script>
