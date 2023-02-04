<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Aktueller Status: {{ task?.status }}
      </h3>
    </div>
    <div class="border border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Datum</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.user?.scoutName }} ({{ task?.user?.email }})
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">gestellt am</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.createdAt ? moment(task?.createdAt).format("llll") : '' }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">in Gruppe</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.group?.name }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Begründung für den Antrag</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.applicationText ? task?.applicationText : "Kein Text" }}
          </dd>
        </div>
      </dl>
    </div>
    <div
      v-if="task?.status !== 'Nicht überprüft'"
      class="border border-gray-200 px-4 py-5 sm:px-6"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Freigabeprozess
        </h3>
      </div>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Entschieden von</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.checkedBy?.scoutName }} ({{ task?.checkedBy?.email }})
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Begründung der Entscheidung</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ task?.responseText ? task?.responseText : 'Keine Begründung' }}
          </dd>
        </div>
      </dl>
    </div>
    <div>
      <RequestListButton :request="task"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import moment from "moment";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/vue/24/outline";
import { useTaskStore } from "@/modules/task/store/index";
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import TabWrapper from "@/components/base/TabWrapper.vue";
import TaskListItem from "@/modules/task/components/TaskListItem.vue";
import EventListItemEmpty from "@/modules/event/components/EventListItemEmpty.vue";
import PrimaryButton from "@/components/button/Primary.vue";

const taskStore = useTaskStore();
const dashboardStore = useDashboardStore();

import { useRoute } from "vue-router";

const isLoading = ref(false);

const route = useRoute();

const task = computed(() => {
  const id = route.params.id;
  if (id) {
    return taskStore.myRequests.filter((item) => item.id === id)[0];
  }
  return [];
});

function onButtonClicked() {

}

onMounted(() => {
  taskStore.fetchMyRequests();
});
</script>
