<template>
  <SmallList
    title="Neue Nachrichten"
    :items="messages"
    emptyText="Keine unbeantworteten Nachrichten"
    allButton="Alle Nachrichten"
    :isLoading="isLoading"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useMessageStore } from "@/modules/message/store";


const messageStore = useMessageStore();

const isLoading = computed(() => {
  return messageStore.isLoading;
});

const messages = computed(() => {
  return messageStore.messages.slice(0, 5);
});

onMounted(() => {
  messageStore.fetchMessages();
});
</script>
