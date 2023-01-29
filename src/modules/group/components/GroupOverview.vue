<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ group.name }}
      </h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Recht</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ group.permission }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Hierarchie</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ group.parent ? group.parent.name : "hat keine höheres Element" }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Noch keine Beschreibung hinterlegt
          </dd>
        </div>

        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Aktionen</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <RocketLaunchIcon
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="ml-2 w-0 flex-1 truncate"
                    >Ich möchte Mitglied in dieser Gruppe werden.</span
                  >
                </div>
                <div class="ml-4 flex-shrink-0">
                  <button
                    @click="onRequestAccess"
                    type="button"
                    class="
                      inline-flex
                      items-center
                      rounded
                      border border-gray-300
                      bg-white
                      px-2.5
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-700
                      shadow-sm
                      hover:bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                    "
                  >
                    Mitgliedschaft beantragen
                  </button>
                </div>
              </li>
            </ul>
          </dd>
        </div>

        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Untergruppen</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                v-for="child in group.children"
                :key="child.id"
              >
                <div class="flex w-0 flex-1 items-center">
                  <UserGroupIcon
                    class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span> {{ group.name }} -> {{ child.name }}</span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <router-link
                    :to="{
                      name: 'GroupOverview',
                      params: {
                        id: child.id,
                      },
                    }"
                    class="text-blue-600 hover:text-blue-900"
                    >Untergruppen öffnen<span class="sr-only"
                      >, {{ child.name }}</span
                    ></router-link
                  >
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
    <RequestModal
      :open="openRequestAccess"
      :callbackOnConfirm="onConfirmClicked"
      :callbackOnCancel="onCancellicked"
    />
  </div>
</template>

<script setup lang="ts">
import { RocketLaunchIcon, UserGroupIcon } from "@heroicons/vue/20/solid";
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";

const groupStore = useGroupStore();

const group = computed(() => {
  return groupStore.group;
});

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

const route = useRoute();

const openRequestAccess = ref(false);
const openAddGroup = ref(false);

function onRequestAccess() {
  openRequestAccess.value = true;
}

function onAddGroup() {
  openAddGroup.value = true;
}

function onConfirmClicked() {
  openRequestAccess.value = false;
  const id = route.params.id;
  groupStore.sendGroupRequest(id).then((response) => {
    commonStore.showSuccess("Antrag erfolgreich eingereicht");
  });
}
function onCancellicked() {
  openRequestAccess.value = false;
}
</script>