<template>
  <div class="md:pa-64">
    <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <main class="flex-1">
        <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="mt-8 flex flex-col">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle">
                  <div
                    class="
                      overflow-hidden
                      shadow-sm
                      ring-1 ring-black ring-opacity-5
                    "
                  >
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="
                              py-3.5
                              pl-4
                              pr-3
                              text-left text-sm
                              font-semibold
                              text-gray-900
                              sm:pl-6
                              lg:pl-8
                            "
                          >
                            Name des Antragstellers
                          </th>
                          <th
                            scope="col"
                            class="
                              px-3
                              py-3.5
                              text-left text-sm
                              font-semibold
                              text-gray-900
                            "
                          >
                            Zielgruppe
                          </th>
                          <th
                            scope="col"
                            class="
                              px-3
                              py-3.5
                              text-left text-sm
                              font-semibold
                              text-gray-900
                            "
                          >
                            Status der Bearbeitung
                          </th>
                          <th
                            scope="col"
                            class="
                              px-3
                              py-3.5
                              text-left text-sm
                              font-semibold
                              text-gray-900
                            "
                          >
                            Überprüft von
                          </th>
                          <th
                            scope="col"
                            class="
                              px-3
                              py-3.5
                              text-left text-sm
                              font-semibold
                              text-gray-900
                            "
                          >
                            Datum der Antragstellung
                          </th>
                          <th
                            scope="col"
                            class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                          >
                            <span class="sr-only">Edit</span>
                          </th>
                          <th
                            scope="col"
                            class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                          >
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="request in myRequests" :key="request.id">
                          <td
                            class="
                              whitespace-nowrap
                              py-4
                              pl-4
                              pr-3
                              text-sm
                              font-medium
                              text-gray-900
                              sm:pl-6
                              lg:pl-8
                            "
                          >
                            {{ request.user.scoutName }} (
                            {{
                              request.user.scoutGroup
                                ? request.user.scoutGroup.name
                                : " - "
                            }}
                            )
                          </td>
                          <td
                            class="
                              whitespace-nowrap
                              px-3
                              py-4
                              text-sm text-gray-500
                            "
                          >
                            {{ request.group.name }} ({{
                              request.group.parent
                                ? request.group.parent.name
                                : " - "
                            }})
                          </td>
                          <td
                            class="
                              whitespace-nowrap
                              px-3
                              py-4
                              text-sm text-gray-500
                            "
                          >
                            {{ request.status }}
                          </td>
                          <td
                            class="
                              whitespace-nowrap
                              px-3
                              py-4
                              text-sm text-gray-500
                            "
                          >
                            {{
                              request.checkedBy
                                ? request.checkedBy.scoutName
                                : " - "
                            }}
                          </td>
                          <td
                            class="
                              whitespace-nowrap
                              px-3
                              py-4
                              text-sm text-gray-500
                            "
                          >
                            {{ moment(request.createdAt).format("llll") }}
                          </td>
                          <td
                            class="
                              whitespace-nowrap
                              px-3
                              py-4
                              text-sm text-gray-500
                            "
                          >
                            <RequestListButton :request="request" />
                          </td>
                          <td
                            class="
                              relative
                              whitespace-nowrap
                              py-4
                              pl-3
                              pr-4
                              text-right text-sm
                              font-medium
                              sm:pr-6
                              lg:pr-8
                            "
                          >
                            <router-link
                              :to="{
                                name: 'TaskDetail',
                                params: { id: request.id },
                              }"
                              class="text-blue-600 hover:text-blue-900"
                              >öffnen
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                    <p v-if="!myRequests.length" class="px-2 py-2">Keine Anträge vorhanden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
} from "@heroicons/vue/24/outline";
import { useTaskStore } from "@/modules/task/store/index";
import { useDashboardStore } from "@/modules/dashboard/store/index";
import RequestListButton from "@/modules/group/components/RequestListButton.vue";

const taskStore = useTaskStore();
const dashboardStore = useDashboardStore();

const myRequests = computed(() => {
  return taskStore.myRequests;
});

onMounted(() => {
  taskStore.fetchMyRequests();
  dashboardStore.fetchMyRequests()
});
</script>