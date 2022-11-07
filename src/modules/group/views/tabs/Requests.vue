<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Antragsteller
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Freigegeben von
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
          <span class="sr-only"></span>
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          <span class="sr-only"></span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="person in requests" :key="person.email">
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ person.user }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ person.checkedBy }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ person.status }}
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
          <button
            v-if="!person.checkedBy"
            @click="onDeclineButtonClicked(person)"
            class="text-blue-600 hover:text-blue-900"
          >
            Ablehnen<span class="sr-only">, {{ person.name }}</span>
          </button>
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
          <button
            v-if="!person.checkedBy"
            @click="onAcceptButtonClicked(person)"
            class="text-blue-600 hover:text-blue-900"
          >
            Zustimmen<span class="sr-only">, {{ person.name }}</span>
          </button>
        </td>
      </tr>
    </tbody>
    <BasicModal
      :open="openAcceptModal"
      :callbackOnConfirm="onAcceptConfirmClicked"
      :callbackOnCancel="onAcceptCancelClicked"
      text="Möchtest du den Antrag annehmen?"
      header="Annehmen"
      confirmText="Annehmen"
    />
    <BasicModal
      :open="openDeclineModal"
      :callbackOnConfirm="onDeclineConfirmClicked"
      :callbackOnCancel="onDeclineCancelClicked"
      text="Möchtest du den Antrag ablehnen?"
      header="Ablehnen"
      confirmText="Ablehnen"
    />
  </table>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";
import BasicModal from "@/components/modal/Basic.vue";

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();
const groupStore = useGroupStore();

const route = useRoute();

const openAcceptModal = ref(false);
const openDeclineModal = ref(false);
const requestId = ref(false);

// Accept Button
function onAcceptButtonClicked(item) {
  openAcceptModal.value = true;
  requestId.value = item.id;
}

function onAcceptCancelClicked() {
  openAcceptModal.value = false;
}
function onAcceptConfirmClicked() {
  openAcceptModal.value = false;
  const groupId = route.params.id;
  groupStore.sendAcceptRequest(groupId, requestId.value).then((response) => {
    commonStore.showSuccess("Antrag erfolgreich eingereicht");
  });
}

// Decline Button

function onDeclineButtonClicked() {
  openDeclineModal.value = true;
}

function onDeclineCancelClicked() {
  openDeclineModal.value = false;
}
function onDeclineConfirmClicked() {
  openDeclineModal.value = false;
  const groupId = route.params.id;
  groupStore.sendDeclineRequest(groupId, requestId.value).then((response) => {
    commonStore.showSuccess("Antrag erfolgreich abgelehnt");
  });
}
function onAcceptCancellicked() {
  openAcceptModal.value = false;
}

// Load Data

const requests = computed(() => {
  return groupStore.requests;
});

onMounted(() => {
  const id = route.params.id;
  groupStore.fetchRequestById(id);
});
</script>
