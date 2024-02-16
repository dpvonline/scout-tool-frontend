<template>
  <div class="px-4 sm:px-6 py-3 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Deine Gruppen</h1>
        <p class="mt-2 text-sm text-gray-700">
          In dieser Liste sind alle deine Gruppen
        </p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <SimpleList
        :items="myGroups"
        detailPageLink="GroupOverview"
        :isLoading="isLoading"
      >
        <template v-slot:notEmpty="slotProps">
          <GroupListItem :item="slotProps.item" />
        </template>
        <template v-slot:empty> Du bist in keiner Gruppe </template>
      </SimpleList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";

import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import GroupListItem from "@/modules/group/components/GroupListItem.vue";

import { useRoute } from "vue-router";
const route = useRoute();

import { useGroupStore } from "@/modules/group/store";
const groupStore = useGroupStore();

const myGroups = ref([])

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = true
  groupStore.fetchMyGroups().then((response) => {
    myGroups.value = response.data;
    isLoading.value = false
  });
});
</script>