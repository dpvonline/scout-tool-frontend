<template>
  <div class="px-4 sm:px-6 py-3 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">
          In folgenden Gruppen bist du Mitglied
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          In dieser Liste sind alle deine Gruppen dargestellt.
        </p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div
            class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5"
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
                    Gruppenname
                  </th>
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
                    Mitglied?
                  </th>
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
                    Rolle
                  </th>
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
                    Link zur Gruppe
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="group in myGroups" :key="group.id">
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
                    {{
                      `${group.displayName}`
                    }}
                  </td>
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
                    {{ group.isMember ? "Mitglied" : "kein Mitglied" }}
                  </td>
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
                    {{
                      group.permission === "none" ? "Keine" : group.permission
                    }}
                  </td>
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
                    <router-link
                      v-if="group.id"
                      :to="{
                        name: 'GroupOverview',
                        params: {
                          id: group.id,
                        },
                      }"
                      class="text-blue-600 hover:text-blue-900"
                      >Gruppe öffnen
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";
import { useGroupStore } from "@/modules/group/store/index";

const groupStore = useGroupStore();

const myGroups = computed(() => {
  return groupStore.myGroups;
});

onMounted(() => {
  groupStore.fetchMyGroups();
});
</script>