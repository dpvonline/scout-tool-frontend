<template>
  <div class="md:pa-64">
    <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <main class="flex-1">
        <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
          <Breadcrumbs :pages="pages" />
          <TaskOverview :tasks="tasks" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskOverview from "@/modules/task/components/TaskOverview.vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { useTaskStore } from "@/modules/task/store/index";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

import { ref, watch, onMounted, computed } from "vue";

const taskStore = useTaskStore();

const task = computed(() => {
  return taskStore.task;
});

const pages = [{ name: "Alle Aufgaben", link: "AllTasks" }];

function refreshData() {
  const id = route.params.id;
  if (id) {
    // taskStore.fetchTaskById(id);
  }
}

onMounted(() => {
  refreshData();
});
</script>
