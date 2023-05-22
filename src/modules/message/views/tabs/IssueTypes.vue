<template>
  <TabWrapper>
    <SimpleList :items="issueTypes" :isLoading="isLoading" detailPageLink="IssueTypeDetail">
      <template v-slot:notEmpty="slotProps">
      <IssueTypeItem :item="slotProps.item">
      </IssueTypeItem>
      </template>
      <template v-slot:empty>
        <MessageListItemEmpty>
          Du hast keine Nachrichten
        </MessageListItemEmpty>
      </template>
    </SimpleList>
  </TabWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useMessageStore } from "@/modules/message/store/index";

import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import IssueTypeItem from "@/modules/message/components/issueType/issueTypeComponents/IssueTypeItem.vue";
import MessageListItemEmpty from "@/modules/message/components/MessageListItemEmpty.vue";

const messageStore = useMessageStore();

const issueTypes = computed(() => {
  return messageStore.issueTypes
});

const isLoading = computed(() => {
  return messageStore.isLoading;
});

onMounted(() => {
  messageStore.fetchIssueTypes();
});
</script>
