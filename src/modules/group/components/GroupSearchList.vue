<template>
  <div>
    <List
      :name="'Gruppen'"
      :items="groups"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="GroupMain"
      detailPageLink="GroupOverview"
    >
      <template #listitem="{ item }">
        <div class="flex min-w-0 flex-1 items-center">
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p class="truncate text-sm font-medium text-blue-600">
                {{ item.name }}
              </p>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <nav class="flex" aria-label="Breadcrumb">
                  <ol role="list" class="flex items-center space-x-4">
                    <li class="flex">
                      <div class="flex items-center">
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                          <TagIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                          <span class="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    <li v-for="page in collectParents(item.parent)" :key="page.name" class="flex">
                      <div class="flex items-center">
                        <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" >{{ page.name }}</p>
                      </div>
                    </li>
                  </ol>
                </nav>
              </p>
            </div>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon, ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "@/modules/group/store/index.ts";

import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

const groupStore = useGroupStore();

const searchValue = ref();

const route = useRoute();

const groupsOverview = computed(() => {
  return groupStore.groupsOverview;
});

const groups = computed(() => {
  return groupStore.groupsOverview;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

onMounted(() => {
  groupStore.fetchGroupsOverview(route.query);
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
  groupStore.fetchGroupsOverview(params);
}

function collectParents(items) {
  debugger;
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
