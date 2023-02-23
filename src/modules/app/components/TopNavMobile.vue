<template>
  <TransitionRoot as="template" :show="props.sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="onCloseClicked">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-y-full"
          enter-to="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-y-0"
          leave-to="-translate-y-full"
        >
          <DialogPanel
            class="relative flex w-full flex-col bg-white focus:outline-none"
          >
            <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div class="flex flex-shrink-0 items-center px-4">
                <router-link :to="{ name: 'LandingMain' }">
                  <img
                    class="h-12 w-auto"
                    src="./../assets/logo-white.png"
                    alt="Pfadfinderlilie"
                  />
                </router-link>
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div
                  class="
                    absolute
                    inset-x-0
                    top-0
                    z-30
                    mx-auto
                    w-full
                    max-w-3xl
                    origin-top
                    transform
                    p-2
                    transition
                  "
                >
                  <div
                    class="
                      divide-y divide-gray-200
                      rounded-lg
                      bg-white
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                    "
                  >
                    <div class="pt-3 pb-2">
                      <div class="flex items-center justify-between px-4">
                        <div>
                          <img
                            class="h-12 w-auto"
                            src="./../assets/logo.png"
                            alt="Pfadfinderlilie"
                          />
                        </div>
                        <div class="-mr-2">
                          <button
                            type="button"
                            @click="onCloseClicked"
                            class="
                              inline-flex
                              items-center
                              justify-center
                              rounded-md
                              bg-white
                              p-2
                              text-gray-400
                              hover:bg-gray-100 hover:text-gray-500
                              focus:outline-none
                              focus:ring-2
                              focus:ring-inset
                              focus:ring-blue-500
                            "
                          >
                            <span class="sr-only">Close menu</span>
                            <svg
                              class="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="mt-3 space-y-1 px-2">
                        <router-link
                          v-for="item in props.navigation"
                          @click="onCloseClicked"
                          :key="item.name"
                          :to="{ name: item.linkName }"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                          :class="[
                            currentRoute.includes(item.route)
                              ? 'font-bold text-black bg-gray-200'
                              : 'font-medium text-gray-900',
                          ]"
                          >{{ item.name }}
                          <span
                            v-if="item.count & (item.count > 0)"
                            :class="[
                              item.current
                                ? 'bg-white'
                                : 'bg-red-500 group-hover:bg-gray-200',
                              'ml-1 inline-block py-0.5 px-3 text-xs text-white font-medium rounded-full',
                            ]"
                            >{{ item.count }}</span
                          ></router-link
                        >
                      </div>
                    </div>
                    <div class="pt-4 pb-2">
                      <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                          <span
                            class="
                              inline-flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-full
                              bg-blue-100
                            "
                          >
                            <span
                              class="
                                text-lg
                                font-medium
                                leading-none
                                text-black
                              "
                              >{{ personalData?.scoutName?.charAt(0) }}
                            </span>
                          </span>
                        </div>
                        <div class="ml-3 min-w-0 flex-1">
                          <div
                            class="truncate text-base font-medium text-gray-800"
                          >
                            {{ personalData.scoutName }}
                          </div>
                          <div
                            class="truncate text-sm font-medium text-gray-500"
                          >
                            {{ personalData.email }}
                          </div>
                        </div>
                        <router-link
                          :to="{ name: 'AllNotification' }"
                          @click="onCloseClicked"
                          type="button"
                          class="
                            ml-auto
                            flex-shrink-0
                            rounded-full
                            bg-white
                            p-1
                            text-gray-400
                            hover:text-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                          "
                        >
                          <span class="sr-only">View notifications</span>
                          <span class="relative inline-block">
                            <BellAlertIcon class="h-6 w-6 text-blue-800" />
                            <span
                              v-if="!!notificationCount.unreadCount"
                              class="
                                absolute
                                top-0
                                right-0
                                inline-flex
                                items-center
                                justify-center
                                px-2
                                py-1
                                text-xs
                                font-bold
                                leading-none
                                text-red-100
                                transform
                                translate-x-1/2
                                -translate-y-1/2
                                bg-red-600
                                rounded-full
                              "
                            >
                              {{ notificationCount.unreadCount }}
                            </span>
                          </span>
                        </router-link>
                      </div>
                      <div class="mt-3 space-y-1 px-2">
                        <router-link
                          v-for="item in props.secondaryNavigation"
                          :key="item.name"
                          :to="{ name: item.linkName }"
                          @click="onCloseClicked"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                          :class="[
                            currentRoute.includes(item.route)
                              ? 'font-bold text-black bg-gray-200'
                              : 'font-medium text-gray-900',
                          ]"
                          >{{ item.name }}</router-link
                        >

                        <router-link
                          :to="{}"
                          @click="onLogoutClicked"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                          >Ausloggen</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
const props = defineProps({
  navigation: { type: Array, required: true },
  secondaryNavigation: { type: Array, required: true },
  sidebarOpen: { type: Boolean, required: true },
});
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  ComboboxOption,
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxOptions,
  ComboboxButton,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  XMarkIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  UserIcon,
  BellAlertIcon,
  InboxIcon,
  CalendarDaysIcon,
  TableCellsIcon,
  BugAntIcon,
  QuestionMarkCircleIcon,
  PuzzlePieceIcon,
} from "@heroicons/vue/24/outline";

import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

import { useAppStore } from "@/modules/app/store/index.ts";
const appStore = useAppStore();

import { useDashboardStore } from "@/modules/dashboard/store/index.ts";
const dashbordStore = useDashboardStore();

import { useMessageStore } from "@/modules/message/store/index";
const messageStore = useMessageStore();

import { useNotificationStore } from "@/modules/notification/store";
const notificationsStore = useNotificationStore();

const isAuth = computed(() => {
  return authStore.isAuth;
});

const openTaskCount = computed(() => {
  return dashbordStore.openTaskCount;
});

const unProcessedMessages = computed(() => {
  return messageStore.unProcessedMessages;
});

const personalData = computed(() => {
  return personalDataStore.personalData;
});

const notificationCount = computed(() => {
  return notificationsStore.notificationCount;
});

const route = useRoute();

const currentRoute = computed(() => {
  return route.fullPath;
});

function onLogoutClicked() {
  authStore.logout();
}

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};

onMounted(() => {
  if (isAuth.value) {
    dashbordStore.fetchMyRequests();
  }
});
</script>
