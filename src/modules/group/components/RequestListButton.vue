<template>
  <div>
    <button
      type="button"
      @click="onAcceptButtonClicked(props.request)"
      class="
        inline-flex
        items-center
        rounded
        border border-gray-300
        bg-green-600
        px-2.5
        py-1.5
        text-xs
        font-medium
        text-gray-100
        shadow-sm
        hover:bg-green-800
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      "
    >
      Annehmen
    </button>
    <button
      type="button"
      @click="onDeclineButtonClicked(props.request)"
      class="
        inline-flex
        items-center
        rounded
        border border-gray-300
        bg-red-600
        px-2.5
        py-1.5
        text-xs
        font-medium
        text-gray-100
        hover:bg-red-800
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      "
    >
      Ablehnen
    </button>
    <RequestModal
      :open="openAcceptModal"
      :callbackOnConfirm="onAcceptConfirmClicked"
      :callbackOnCancel="onAcceptCancelClicked"
      text="Möchtest du den Antrag annehmen?"
      header="Annehmen"
      confirmText="Annehmen"
    />
    <RequestModal
      :open="openDeclineModal"
      :callbackOnConfirm="onDeclineConfirmClicked"
      :callbackOnCancel="onDeclineCancelClicked"
      text="Möchtest du den Antrag ablehnen?"
      header="Ablehnen"
      confirmText="Ablehnen"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, watch, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();
const groupStore = useGroupStore();
import { useTaskStore } from "@/modules/task/store/index";

const taskStore = useTaskStore();

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
    const id = route.params.id;
    if (id) {
      groupStore.fetchRequestById(id);
    } else {
      taskStore.fetchMyRequests();
    }
  });
}

// Decline Button
function onDeclineButtonClicked(item) {
  openDeclineModal.value = true;
  requestId.value = item.id;
}

function onDeclineCancelClicked() {
  openDeclineModal.value = false;
}
function onDeclineConfirmClicked() {
  openDeclineModal.value = false;
  const groupId = route.params.id;
  groupStore.sendDeclineRequest(groupId, requestId.value).then((response) => {
    commonStore.showSuccess("Antrag erfolgreich abgelehnt");
    const id = route.params.id;
    if (id) {
      groupStore.fetchRequestById(id);
    } else {
      taskStore.fetchMyRequests();
    }
  });
}
function onAcceptCancellicked() {
  openAcceptModal.value = false;
}

const props = defineProps({
  request: Object,
});

</script>
