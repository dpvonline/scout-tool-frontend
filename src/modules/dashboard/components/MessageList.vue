<template>
  <SmallList
    title="Meine Nachrichten"
    :items="messages"
    emptyText="Keine unbeantworteten Nachrichten"
    allButton="Zu den Nachrichten"
    :isLoading="isLoading"
    allLinkButtonName="NewMessages"
  >
    <template v-slot:item="props">
      <p>
        {{ props.item?.issue?.issueSubject }}:
      </p>
      <p>
        {{ props.item?.messageBody }}
      </p>
    </template>
  </SmallList>
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
