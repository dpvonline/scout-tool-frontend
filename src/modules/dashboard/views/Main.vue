<template>
  <div class="h-full">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="sr-only">Profile</h1>
      <!-- Main 3 column grid -->
      <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <!-- Left column -->
        <div class="grid grid-cols-1 gap-4 lg:col-span-2">
          <!-- Welcome panel -->
          <section aria-labelledby="profile-overview-title">
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <h2 class="sr-only" id="profile-overview-title">
                Profile Overview
              </h2>
              <div class="bg-white p-3 sm:p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:flex sm:space-x-5">
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <span
                        class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
                      >
                        <span
                          class="text-xl font-medium leading-none text-black"
                          >{{ personalData?.scoutName?.charAt(0) }}
                        </span>
                      </span>
                    </div>
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p class="text-sm font-medium text-gray-600">Gut Pfad,</p>
                      <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                        {{ personalData.scoutName }}
                      </p>
                      <p class="text-sm text-gray-700">
                        {{ personalData.email }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-5 flex justify-center sm:mt-0">
                    <router-link
                      :to="{ name: 'SettingsGeneral' }"
                      class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >Profil</router-link
                    >
                  </div>
                </div>
              </div>
              <div
                class="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
              >
                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-blue-600 mr-1">{{
                    messageStore.unProcessedMessages
                  }}</span>
                  <router-link
                    :to="{ name: 'NewMessages' }"
                    class="text-blue-600"
                    >Offene Issues</router-link
                  >
                </div>

                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-blue-600 mr-1">{{ openTaskCount }}</span>
                  <router-link :to="{ name: 'AllTasks' }" class="text-blue-600"
                    >Aufgaben</router-link
                  >
                </div>

                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-blue-600 mr-1">{{ openInvitationCount }}</span>
                  <router-link
                    :to="{
                      name: 'EventInvitations',
                      query: { status: 'pending' },
                    }"
                    class="text-blue-600"
                    >offene Einladungen</router-link
                  >
                </div>
              </div>
            </div>
          </section>

          <!-- Actions panel -->
          <section aria-labelledby="quick-links-title">
            <ActionsList class="my-8" :actions="actionList" />
          </section>
        </div>

        <!-- Right column -->
        <div class="grid grid-cols-1 gap-4">
          <!-- Announcements -->
          <section aria-labelledby="announcements-title">
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-6">
                <h2
                  class="text-base font-medium text-gray-900"
                  id="announcements-title"
                >
                  Benachrichtigungen
                </h2>
                <div class="mt-6 flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li
                      class="py-5"
                      v-for="notification in notifications.slice(0, 5)"
                      :key="notification.id"
                      v-if="notifications.length"
                    >
                      <div
                        class="relative focus-within:ring-2 focus-within:ring-blue-500"
                      >
                        <h3 class="text-sm font-semibold text-gray-800">
                          <router-link
                            :to="{
                              name: 'NotificationDetail',
                              params: { id: notification.id },
                            }"
                            class="hover:underline focus:outline-none"
                          >
                            <!-- Extend touch target to entire panel -->
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                            {{ notification.verb }}
                          </router-link>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                          vor
                          {{
                            -moment(notification.timestamp).diff(
                              moment(),
                              "days"
                            )
                          }}
                          Tagen
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ moment(notification.timestamp).format("llll") }}
                        </p>
                      </div>
                    </li>
                    <li v-else>
                      <h3 class="text-sm font-semibold text-gray-800">
                        Keine neue Benachrichtigungen
                      </h3>
                    </li>
                  </ul>
                </div>
                <div class="mt-6">
                  <router-link
                    :to="{ name: 'AllNotification' }"
                    class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >Alle Benachrichtigungen</router-link
                  >
                </div>
              </div>
            </div>
          </section>

          <!-- Recent Hires -->
          <section aria-labelledby="recent-hires-title">
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-6">
                <h2
                  class="text-base font-medium text-gray-900"
                  id="recent-hires-title"
                >
                  Veranstaltungen
                </h2>
                <div class="mt-6 flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li
                      class="py-4"
                      v-for="event in eventOverviews"
                      :key="event.id"
                    >
                      <div class="flex items-center space-x-4">
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-sm font-medium text-gray-900">
                            {{ event.name }}
                          </p>
                          <p class="truncate text-sm text-gray-500">
                            {{ event.shortDescription }}
                          </p>
                        </div>
                        <div>
                          <router-link
                            :to="{ name: 'EventPlanungsjurte' }"
                            class="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                            >Öffnen</router-link
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="mt-6">
                  <a
                    href="#"
                    class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >Alle Veranstaltungen</a
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, onMounted } from "vue";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  LinkIcon,
} from "@heroicons/vue/24/outline";

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { useDashboardStore } from "@/modules/dashboard/store/index.ts";
import { useGroupStore } from "@/modules/group/store/index.ts";
import { useTaskStore } from "@/modules/task/store/index";

import NotifyList from "@/modules/dashboard/components/NotifyList.vue";
import MyGroups from "@/modules/dashboard/components/MyGroups.vue";
import ActionsList from "@/components/actionlist/ActionsList.vue";
import EventList from "@/modules/dashboard/components/EventList.vue";
import MessageList from "@/modules/dashboard/components/MessageList.vue";
import SimpleAvatar from "@/components/avatar/Simple.vue";

const cards = computed(() => {
  return [
    // {
    //   name: "Alle Mitglieder",
    //   href: "PersonMain",
    //   icon: UserIcon,
    //   amount: userCount,
    // },
    {
      name: "Alle Gruppen",
      href: "GroupMain",
      icon: UserGroupIcon,
      amount: groupCount,
    },
    {
      name: "Offene Aufgaben",
      href: "TaskMain",
      icon: BellIcon,
      amount: openTaskCount,
    },
    {
      name: "Neue Nachrichten",
      href: "MessageMain",
      icon: InboxIcon,
      amount: unProcessedMessages,
    },
  ];
});

import { useRoute } from "vue-router";

const personalDataStore = usePersonalDataStore();
const dashboardStore = useDashboardStore();
const groupStore = useGroupStore();
const taskStore = useTaskStore();

import { useMessageStore } from "@/modules/message/store/index";
const messageStore = useMessageStore();

const route = useRoute();

const personalData = computed(() => {
  return personalDataStore.personalData;
});
const isLoading = computed(() => {
  return dashboardStore.isLoading;
});
const groupCount = computed(() => {
  return dashboardStore.groupCount;
});
const userCount = computed(() => {
  return dashboardStore.userCount;
});
const openTaskCount = computed(() => {
  return dashboardStore.openTaskCount;
});
const openInvitationCount = computed(() => {
  return dashboardStore.openInvitationCount;
});
const myGroups = computed(() => {
  return groupStore.myGroups;
});
const unProcessedMessages = computed(() => {
  return messageStore.unProcessedMessages;
});

import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

import { useNotificationStore } from "@/modules/notification/store";
const notificationsStore = useNotificationStore();

const notifications = computed(() => {
  return notificationsStore.notifications;
});

onMounted(() => {
  personalDataStore.fetchPersonalData();
  dashboardStore.fetchGroupCount();
  dashboardStore.fetchUserCount();
  dashboardStore.fetchMyRequests();
  dashboardStore.fetchOpenInvatations();
  groupStore.fetchMyGroups();
  messageStore.fetchMessages();
  notificationsStore.fetchNotifications();
  eventStore.fetchEventOverviews();
});

import { useEventStore } from "@/modules/event/store";

const eventStore = useEventStore();

const eventOverviews = computed(() => {
  return eventStore.eventOverviews;
});

const actionList = [
  {
    title: "Suche in alle Gruppen",
    description:
      "Du bekommst alle Gruppen des DPVs angezeigt und kannst dort Anträge stellen oder Mitglieder einsehen, wenn du die Rechte dazu hast.",
    link: "GroupSearch",
    icon: UserGroupIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Zeige meine Gruppen",
    description: "Zeige dir die Gruppen an, die du selbst erstellt hast.",
    link: "MyGroups",
    icon: BuildingStorefrontIcon,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
  {
    title: "Meine aktuellen persönlichen Daten einsehen ",
    description: "Du kannst deine persönlichen Daten einsehen.",
    link: "SettingsGeneral",
    icon: UserCircleIcon,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
  },
  {
    title: "Meine aktuellen persönlichen Daten ändern ",
    description: "Du kannst deine persönlichen Daten ändern.",
    link: "SettingsGeneralEdit",
    icon: PencilSquareIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
  {
    title: "Meine offenen Aufgaben",
    description:
      "Du kannst deine noch zu erledigen Aufgaben einsehen und direkt erledigen.",
    link: "AllTasks",
    icon: BuildingOfficeIcon,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
  },
  {
    title: "Deine von dir gestellten Anträge einsehen",
    description:
      "Du kannst die Aufgaben ansehen die andere für dich erledigen sollen.",
    link: "MyRequestedTasks",
    icon: BuildingOfficeIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
];
</script>