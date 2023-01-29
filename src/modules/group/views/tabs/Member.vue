<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="
            py-3.5
            pl-4
            pr-3
            text-left text-sm
            font-semibold
            text-gray-900
            sm:pl-6
          "
        >
          Vorname
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Nachname
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Pfadfindername
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="item in groupMembers" :key="item.person.id">
        <td
          class="
            whitespace-nowrap
            py-4
            pl-4
            pr-3
            text-sm
            font-medium
            text-gray-900
            sm:pl-6
          "
        >
          {{ item.person.firstName }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ item.person.lastName }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ item.person.scoutName }}
        </td>
        <td
          class="
            relative
            whitespace-nowrap
            py-4
            pl-3
            pr-4
            text-right text-sm
            font-medium
            sm:pr-6
          "
        >
          <!-- <router-link
            :to="{
              name: 'PersonDetails',
              params: {
                id: item.person.id,
              },
            }"
            class="text-blue-600 hover:text-blue-900"
            >Öffnen<span class="sr-only">, {{ item.person.firstName }}</span></router-link
          > -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";

import { useRoute } from "vue-router";

const route = useRoute();

const groupStore = useGroupStore();
const groupMembers = computed(() => {
  return groupStore.groupMembers;
});

onMounted(() => {
  const id = route.params.id;
  groupStore.fetchGroupMembersById(id);
});
</script>

<style>
</style>