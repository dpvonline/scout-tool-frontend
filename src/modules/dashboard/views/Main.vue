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
              <div class="bg-white p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:flex sm:space-x-5">
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p class="text-sm font-medium text-gray-600">
                        Gut Pfad,
                      </p>
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
                      :to="{ name: 'SettingsGeneral'}"
                      class="
                        flex
                        items-center
                        justify-center
                        rounded-md
                        border border-gray-300
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:bg-gray-50
                      "
                      >Profil</router-link
                    >
                  </div>
                </div>
              </div>
              <div
                class="
                  grid grid-cols-1
                  divide-y divide-gray-200
                  border-t border-gray-200
                  bg-gray-50
                  sm:grid-cols-3 sm:divide-y-0 sm:divide-x
                "
              >
                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-gray-900 mr-1">0</span>
                  <span class="text-gray-600">Offene Issues</span>
                </div>

                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-gray-900 mr-1">3</span>
                  <span class="text-gray-600">Aufgaben</span>
                </div>

                <div class="px-6 py-5 text-center text-sm font-medium">
                  <span class="text-gray-900 mr-1">4</span>
                  <span class="text-gray-600">offene Veranstaltungen</span>
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
                  Neuigkeiten
                </h2>
                <div class="mt-6 flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li class="py-5">
                      <div
                        class="
                          relative
                          focus-within:ring-2 focus-within:ring-blue-500
                        "
                      >
                        <h3 class="text-sm font-semibold text-gray-800">
                          <a
                            href="#"
                            class="hover:underline focus:outline-none"
                          >
                            <!-- Extend touch target to entire panel -->
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                            Office closed on July 2nd
                          </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                          Cum qui rem deleniti. Suscipit in dolor veritatis
                          sequi aut. Vero ut earum quis deleniti. Ut a sunt eum
                          cum ut repudiandae possimus. Nihil ex tempora neque
                          cum consectetur dolores.
                        </p>
                      </div>
                    </li>

                    <li class="py-5">
                      <div
                        class="
                          relative
                          focus-within:ring-2 focus-within:ring-blue-500
                        "
                      >
                        <h3 class="text-sm font-semibold text-gray-800">
                          <a
                            href="#"
                            class="hover:underline focus:outline-none"
                          >
                            <!-- Extend touch target to entire panel -->
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                            New password policy
                          </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                          Alias inventore ut autem optio voluptas et
                          repellendus. Facere totam quaerat quam quo laudantium
                          cumque eaque excepturi vel. Accusamus maxime ipsam
                          reprehenderit rerum id repellendus rerum. Culpa cum
                          vel natus. Est sit autem mollitia.
                        </p>
                      </div>
                    </li>

                    <li class="py-5">
                      <div
                        class="
                          relative
                          focus-within:ring-2 focus-within:ring-blue-500
                        "
                      >
                        <h3 class="text-sm font-semibold text-gray-800">
                          <a
                            href="#"
                            class="hover:underline focus:outline-none"
                          >
                            <!-- Extend touch target to entire panel -->
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                            Office closed on July 2nd
                          </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                          Tenetur libero voluptatem rerum occaecati qui est
                          molestiae exercitationem. Voluptate quisquam iure
                          assumenda consequatur ex et recusandae. Alias
                          consectetur voluptatibus. Accusamus a ab dicta et.
                          Consequatur quis dignissimos voluptatem nisi.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="mt-6">
                  <a
                    href="#"
                    class="
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-md
                      border border-gray-300
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-gray-700
                      shadow-sm
                      hover:bg-gray-50
                    "
                    >View all</a
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
                  Recent Hires
                </h2>
                <div class="mt-6 flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-sm font-medium text-gray-900">
                            Leonard Krasner
                          </p>
                          <p class="truncate text-sm text-gray-500">
                            @leonardkrasner
                          </p>
                        </div>
                        <div>
                          <a
                            href="#"
                            class="
                              inline-flex
                              items-center
                              rounded-full
                              border border-gray-300
                              bg-white
                              px-2.5
                              py-0.5
                              text-sm
                              font-medium
                              leading-5
                              text-gray-700
                              shadow-sm
                              hover:bg-gray-50
                            "
                            >View</a
                          >
                        </div>
                      </div>
                    </li>

                    <li class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-sm font-medium text-gray-900">
                            Floyd Miles
                          </p>
                          <p class="truncate text-sm text-gray-500">
                            @floydmiles
                          </p>
                        </div>
                        <div>
                          <a
                            href="#"
                            class="
                              inline-flex
                              items-center
                              rounded-full
                              border border-gray-300
                              bg-white
                              px-2.5
                              py-0.5
                              text-sm
                              font-medium
                              leading-5
                              text-gray-700
                              shadow-sm
                              hover:bg-gray-50
                            "
                            >View</a
                          >
                        </div>
                      </div>
                    </li>

                    <li class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-sm font-medium text-gray-900">
                            Emily Selman
                          </p>
                          <p class="truncate text-sm text-gray-500">
                            @emilyselman
                          </p>
                        </div>
                        <div>
                          <a
                            href="#"
                            class="
                              inline-flex
                              items-center
                              rounded-full
                              border border-gray-300
                              bg-white
                              px-2.5
                              py-0.5
                              text-sm
                              font-medium
                              leading-5
                              text-gray-700
                              shadow-sm
                              hover:bg-gray-50
                            "
                            >View</a
                          >
                        </div>
                      </div>
                    </li>

                    <li class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-sm font-medium text-gray-900">
                            Kristin Watson
                          </p>
                          <p class="truncate text-sm text-gray-500">
                            @kristinwatson
                          </p>
                        </div>
                        <div>
                          <a
                            href="#"
                            class="
                              inline-flex
                              items-center
                              rounded-full
                              border border-gray-300
                              bg-white
                              px-2.5
                              py-0.5
                              text-sm
                              font-medium
                              leading-5
                              text-gray-700
                              shadow-sm
                              hover:bg-gray-50
                            "
                            >View</a
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="mt-6">
                  <a
                    href="#"
                    class="
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-md
                      border border-gray-300
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-gray-700
                      shadow-sm
                      hover:bg-gray-50
                    "
                    >View all</a
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
import { ref, computed, onMounted } from "vue";
import {
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
} from "@heroicons/vue/24/outline";


import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { useDashboardStore } from "@/modules/dashboard/store/index.ts";
import { useGroupStore } from "@/modules/group/store/index.ts";

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

onMounted(() => {
  personalDataStore.fetchPersonalData();
  dashboardStore.fetchGroupCount();
  dashboardStore.fetchUserCount();
  dashboardStore.fetchMyRequests();
  groupStore.fetchMyGroups();
  messageStore.fetchMessages();
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