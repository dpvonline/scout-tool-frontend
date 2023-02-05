<template>
  <div class="">
    <List
      :name="'Nachrichten'"
      :items="messages"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="AllMessages"
      detailPageLink="MessageDetail"
    >
      <template #listitem="{ item }">
        <MessageListItem :item="item"/>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, watch, onMounted, computed } from "vue";
import List from "@/components/base/list/Main.vue";
import MessageListItem from "@/modules/message/components/MessageListItem.vue";
import { useRoute } from "vue-router";
import { useMessageStore } from "@/modules/message/store";

const messageStore = useMessageStore();

const searchValue = ref();

const route = useRoute();

const messages = computed(() => {
  return messageStore.messages;
});

onMounted(() => {
  messageStore.fetchMessages(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  messageStore.fetchMessages(params);
}

function getColorByProcessed(isProcessed) {
  switch (isProcessed) {
    case true: {
      return "bg-green-500";
      break;
    }
    case false: {
      return "bg-red-500";
      break;
    }
    default: {
      return "bg-black-400";
      break;
    }
  }
}

function getIconByMessageType(id) {
  switch (id) {
    case 1: {
      return BugAntIcon;
      break;
    }
    case 2: {
      return ArrowTrendingUpIcon;
      break;
    }
    case 4: {
      return QuestionMarkCircleIcon;
      break;
    }
    case 5: {
      return TagIcon;
      break;
    }
    default: {
      return QuestionMarkCircleIcon;
      break;
    }
  }
}

const sortOptions = [
  { name: "Neuste", value: "-created_at", current: false },
  { name: "A-Z", value: "alpha", current: false },
];

const filters = [
  {
    id: "message_type",
    name: "Nachrichten Typ",
    options: [
      { value: "1", label: "Verbesserungsvorschlag", checked: false },
      { value: "2", label: "Fehlermeldung", checked: false },
      { value: "4", label: "Frage Allgemein", checked: false },
    ],
  },
  {
    id: "is_processed",
    name: "Status",
    options: [
      { value: "True", label: "Bearbeitet", checked: false },
      { value: "False", label: "Nicht Bearbeitet", checked: false },
    ],
  },
];

const buttonList = [{ name: "Neue Nachricht", linkName: "MessageNew" }];
</script>
