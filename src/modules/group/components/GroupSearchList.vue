<template>
  <div>
    <List
      :name="'Gruppen'"
      :items="groups"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="GroupSearch"
      detailPageLink="GroupOverview"
    >
      <template #listitem="{ item }">
        <GroupListItem :item="item"/>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon, ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import GroupListItem from "@/modules/group/components/GroupListItem.vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "@/modules/group/store/index.ts";

import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

const groupStore = useGroupStore();

const searchValue = ref();

const route = useRoute();


const groups = computed(() => {
  return groupStore.groups;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

onMounted(() => {
  groupStore.fetchGroups(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  groupStore.fetchGroups(params);
}

function collectParents(items) {
  return flattenObject(items)
}

function flattenObject(items) {
  const returnArray = []
  if (items?.parent?.parent?.parent) {
    returnArray.push(items.parent.parent.parent);
  }
  if (items?.parent?.parent) {
    returnArray.push(items.parent.parent);
  }
  if (items?.parent) {
    returnArray.push(items.parent);
  }

  return returnArray;
}

const sortOptions = [];

const filters = [];
const buttonList = [{ name: "Neue Gruppe", linkName: "" }];
</script>
