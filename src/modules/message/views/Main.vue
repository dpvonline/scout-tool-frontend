<template>
  <div class="2xl:px-64 xl:px-30">
    <List
      :name="'Nachrichten'"
      :items="messages"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="MessageMain"
      detailPageLink="MessageDetail"
    >
      <template #listitem="{ item }">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <span
              :class="[
                getColorByProcessed(item.isProcessed),
                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
              ]"
            >
              <component
                :is="getIconByMessageType(item.messageType.id)"
                class="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </div>
          <div>
            <div class="text-sm">
              <div class="font-medium text-gray-600">
                {{ item.createdByEmail }}
              </div>
            </div>
            <div class="text-sm">
              <div class="pt-1 text-sm font-medium text-gray-900">
                {{ item.subject }}
              </div>
            </div>
            <div class="mt-1 text-sm text-gray-700">
              <p>{{ item.messageBody }}</p>
            </div>
            <div class="mt-2 space-x-2 text-sm">
              <span class="font-medium text-gray-800"
                >vor
                {{ -moment(item.createdAt).diff(moment(), "days") }} Tagen</span
              >
              <span class="font-medium text-gray-500">{{
                moment(item.createdAt).format("llll")
              }}</span>
              <span class="font-medium text-gray-500">&middot;</span>
              <span class="font-medium text-gray-400">
                {{ item.messageType.name }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, watch, onMounted, computed } from "vue";
import {
  TagIcon,
  BugAntIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import List from "@/components/base/list/Main.vue";
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
  { name: "Neuste", value: "-created_at", current: true },
  { name: "A-Z", value: "alpha", current: false },
];

const filters = [
  {
    id: "message_type",
    name: "Nachrichten Typ",
    options: [
      { value: "1", label: "Verbesserungsvorschlag", checked: true },
      { value: "2", label: "Fehlermeldung", checked: false },
      { value: "4", label: "Frage Allgemein", checked: false },
    ],
  },
  {
    id: "is_processed",
    name: "Status",
    options: [
      { value: "True", label: "Bearbeitet", checked: true },
      { value: "False", label: "Nicht Bearbeitet", checked: false },
    ],
  },
];

const buttonList = [{ name: "Neue Nachricht", linkName: "MessageNew" }];
</script>
