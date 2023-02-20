<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <MessageDetailList :message="issue" v-if="!isLoading"/>
      <LoadingItem v-else/>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import MessageDetailList from "@/modules/message/components/MessageDetailList.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";

import { useMessageStore } from "@/modules/message/store";

const messageStore = useMessageStore();

const route = useRoute();

const isLoading = computed(() => {
  return messageStore.isLoading;
});

const issue = computed(() => {
  return messageStore.issue;
});

const pages = [{ name: "Alle Issues", link: "MessageMain" }];

onMounted(() => {
  const id = route.params.id;
  if (id) {
    messageStore.fetchIssue(id);
  }
});
</script>