<template>
  <TabWrapper>
    <SimpleList :items="requests" :isLoading="isLoading" detailPageLink="TaskDetail">
      <template v-slot:notEmpty="slotProps">
        <ListItem :item="slotProps.item" />
      </template>
      <template v-slot:empty>
        <PersonListItemEmpty>
          Es gibt keine offenen Aufgaben
        </PersonListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import ListItem from "@/modules/task/components/TaskListItem.vue";
import ListItemEmpty from "@/modules/group/components/PersonListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const route = useRoute();

const groupStore = useGroupStore();

const isLoading = computed(() => {
  return groupStore.isLoading;
});

const requests = computed(() => {
  return groupStore.requests;
});

onMounted(() => {
  const id = route.params.id;
  groupStore.fetchRequestById(id);
});
</script>
