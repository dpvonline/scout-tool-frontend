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
      :empytText="'Zu viele Treffer. Nutze die Suche um deine Suche einzugrenzen.'"
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
import { useCommonStore } from "@/modules/common/store/index.ts";
import { debounce } from "lodash";
const commonStore = useCommonStore();

const personStore = usePersonStore();

const searchValue = ref();

const route = useRoute();

const isLoading = ref(true);

const errorMeasage = ref("");
const users = ref([]);


const updateSearch = debounce(async (params) => {
  isLoading.value = true;
  personStore.fetchUsers(params).then((response) => {
    if (response.status = 200) {
      users.value = response?.data;
      isLoading.value = false;
    } else {
      users.value = [];
      commonStore.showError(response?.response?.data.detail);
      isLoading.value = false;
    }
  });
}, 1000);

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);


const sortOptions = [
  { name: "A-Z", value: "alpha", current: true },
  { name: "Neuste", value: "-created_at", current: false },
];

const filters = [];
const buttonList = [];
</script>
