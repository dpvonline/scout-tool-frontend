<template>
  <div>
    <div>
      <GroupOverview/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import GroupOverview from "@/modules/group/components/GroupOverview.vue";

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

function onConfirmClicked(userId) {
  openRequestAccess.value = false;
  groupStore.sendGroupRequest(userId).then((response) => {
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