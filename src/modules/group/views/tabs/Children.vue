<template>
  <div>
    <div class="sm:flex mx-3 sm:items-center">
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="onAddGroup"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            border border-transparent
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            sm:w-auto
          "
        >
          Gruppe hinzufügen
        </button>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="onRequestAccess"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            border border-transparent
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            sm:w-auto
          "
        >
          Mitgliedschaft beantragen
        </button>
      </div>
    </div>
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
            Name
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Öffnen</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="person in group.children" :key="person.email">
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
            {{ person.name }}
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
            <router-link
              :to="{
                name: 'GroupOverview',
                params: {
                  id: person.id,
                },
              }"
              class="text-blue-600 hover:text-blue-900"
              >Öffnen<span class="sr-only"
                >, {{ person.name }}</span
              ></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <RequestModal
      :open="openRequestAccess"
      :callbackOnConfirm="onConfirmClicked"
      :callbackOnCancel="onCancellicked"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();
const groupStore = useGroupStore();

const route = useRoute();

const openRequestAccess = ref(false);
const openAddGroup = ref(false);

function onRequestAccess() {
  openRequestAccess.value = true;
}

function onAddGroup() {
  openAddGroup.value = true;
}

function onConfirmClicked() {
  openRequestAccess.value = false;
  const id = route.params.id;
  groupStore.sendGroupRequest(id).then((response) => {
    commonStore.showSuccess("Antrag erfolgreich eingereicht");
  });
}
function onCancellicked() {
  openRequestAccess.value = false;
}

const group = computed(() => {
  return groupStore.group;
});
</script>

<style>
</style>