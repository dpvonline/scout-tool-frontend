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
            text-left
            text-sm
            font-semibold
            text-gray-900
            sm:pl-6
            lg:pl-8
          "
        >
          Gruppe des Antrags
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Überprüft von
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Status
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Datum
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="request in requests" :key="request.id">
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
            lg:pl-8
          "
        >
          {{ request.group ? request.user.scoutName : " - " }} (
          {{
            request.user && request.user.scoutGroup
              ? request.user.scoutGroup.name
              : " - "
          }})
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ request.checkedBy ? request.checkedBy.scoutName : " - " }} (
          {{ request.checkedBy ? request.checkedBy.email : " - " }} )
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ moment(request.createdAt).format("llll") }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ request.status }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
         <RequestListButton :request="request"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();
const groupStore = useGroupStore();

const route = useRoute();

// Load Data

const requests = computed(() => {
  return groupStore.requests;
});

onMounted(() => {
  const id = route.params.id;
  groupStore.fetchRequestById(id);
});
</script>
