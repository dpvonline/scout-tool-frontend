<template>
  <TabWrapper>
    <SimpleList :items="groupMembers" :isLoading="isLoading">
      <template v-slot:notEmpty="slotProps">
        <PersonListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <PersonListItemEmpty>
          Es gibt aktuell noch keine Mitglieder
        </PersonListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import PersonListItem from "@/modules/group/components/PersonListItem.vue";
import PersonListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store";
const commonStore = useCommonStore();

const route = useRoute();

const groupStore = useGroupStore();

const groupMembers = ref([]);
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = true;
  const id = route.params.id;
  groupStore.fetchGroupMembersById(id).then(response => {
    if (response.status = 200) {
      groupMembers.value = response?.results;
      isLoading.value = false;
    } else {
      groupMembers.value = [];
      commonStore.showError(response?.response?.results.detail);
      isLoading.value = false;
    }
  });
});
</script>
