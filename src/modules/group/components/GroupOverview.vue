<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ group.name }}
      </h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Zugriff</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              group.permission === "none" ? "Keine Rechte" : group.permission
            }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Nächst höheres Element
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ group.parent ? group.parent.name : "keins" }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Mitglied?</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ group.isMember ? "Ja" : "Nein" }}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Beschreibung</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Noch keine Beschreibung hinterlegt
          </dd>
        </div>

        <div
          class="sm:col-span-2"
          v-if="(!group.isMember && group.membershipAllowed) || true"
        >
          <dt class="text-sm font-medium text-gray-500">Aktionen</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li
                v-if="!group.isMember && group.membershipAllowed"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <RocketLaunchIcon
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="ml-2 w-0 flex-1 truncate"
                    >Mitglied in dieser Gruppe werden.</span
                  >
                </div>
                <div class="ml-4 flex-shrink-0">
                  <Secondary :label="'beantragen'" @click="onRequestAccess" />
                </div>
              </li>
              <li
                v-if="group.permission === 'Administrator'"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <UserPlusIcon
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="ml-2 w-0 flex-1 truncate"
                    >Mitglied zu dieser Gruppe hinzufügen</span
                  >
                </div>
                <div class="ml-4 flex-shrink-0">
                  <Secondary :label="'auswählen'" @click="onAddMemberClicked" />
                </div>
              </li>
              <li
                v-if="group.isMember"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <UserMinusIcon
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="ml-2 w-0 flex-1 truncate"
                    >eigene Mitgliedschaft beenden</span
                  >
                </div>
                <div class="ml-4 flex-shrink-0">
                  <Secondary
                    :label="'austreten'"
                    @click="onLeaveGroupClicked"
                  />
                </div>
              </li>
            </ul>
          </dd>
        </div>

        <div class="sm:col-span-2" v-if="group?.externallinks">
          <dt class="text-sm font-medium text-gray-500">Links</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                v-for="child in Object.keys(group.externallinks)"
                :key="child.id"
              >
                <div class="flex w-0 flex-1 items-center">
                  <LinkIcon
                    class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span> {{ child }}</span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    target="_blank"
                    :href="group.externallinks[child]"
                    class="text-blue-600 hover:text-blue-900"
                    >Im neuem Tab öffnen<span class="sr-only">
                      {{ child.name }}</span
                    ></a
                  >
                </div>
              </li>
            </ul>
          </dd>
        </div>

        <div class="sm:col-span-2" v-if="group?.children?.length">
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
                    v-if="child.id"
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
    <AddMemberModal
      :open="openAddMember"
      :callbackOnConfirm="onAddMemberConfirmClicked"
      :callbackOnCancel="onAddMemberCancellicked"
    />
    <RequestModal
      :open="openLeaveGroup"
      :header="'Gruppe verlassen'"
      :text="'Möchtest du die Gruppe verlassen.'"
      :callbackOnConfirm="onLeaveGroupConfirmClicked"
      :callbackOnCancel="onLeaveGroupCancellicked"
    />
  </div>
</template>

<script setup lang="ts">
import {
  RocketLaunchIcon,
  UserGroupIcon,
  LinkIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/vue/20/solid";
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import RequestModal from "@/modules/group/components/RequestModal.vue";
import AddMemberModal from "@/modules/group/components/AddMemberModal.vue";
import Secondary from "@/components/button/Secondary.vue";
import { useAuthStore } from "@/modules/auth/store/index.ts";

const groupStore = useGroupStore();
const authStore = useAuthStore();

const group = computed(() => {
  return groupStore.group;
});

import { useRoute } from "vue-router";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

const route = useRoute();

const openAddGroup = ref(false);
function onAddGroup() {
  openAddGroup.value = true;
}

const openRequestAccess = ref(false);
function onRequestAccess() {
  openRequestAccess.value = true;
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
// - - - - - - - - - - - - - - - -

const openAddMember = ref(false);
function onAddMemberClicked() {
  openAddMember.value = true;
}
function onAddMemberConfirmClicked(userId) {
  openAddMember.value = false;
  const groupId = route.params.id;
  groupStore.sendGroupInvitation(groupId, userId).then((response) => {
    commonStore.showSuccess("Einladung erfolgreich eingereicht");
  });
}
function onAddMemberCancellicked() {
  openAddMember.value = false;
}
// - - - - - - - - - - - - - - - -

const openLeaveGroup = ref(false);
function onLeaveGroupClicked() {
  openLeaveGroup.value = true;
}
function onLeaveGroupConfirmClicked() {
  openLeaveGroup.value = false;
  const groupId = route.params.id;
  const userId = authStore.user.sub;

  groupStore.sendGroupLeave(groupId, userId).then((response) => {
    commonStore.showSuccess("Du bist erfolgreich ausgetreten.");
  });

  commonStore.showSuccess("Du hast die Gruppe verlassen.");
}
function onLeaveGroupCancellicked() {
  openLeaveGroup.value = false;
}
</script>