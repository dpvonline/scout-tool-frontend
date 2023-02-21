<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="
          relative
          flex flex-wrap
          items-center
          justify-center
          lg:justify-between
        "
      >
        <!-- Logo -->
        <div class="absolute left-0 flex-shrink-0 py-4 lg:static">
          <router-link :to="{ name: 'LandingMain' }">
            <img
              class="h-9 lg:h-9 w-auto"
              src="./../assets/logo-white.png"
              alt="Pfadfinderlilie"
            />
          </router-link>
        </div>

        <!-- Right section on desktop -->
        <div
          v-if="isAuth"
          class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5"
        >
          <router-link
            as="buttom"
            :to="{ name: 'AllHints' }"
            type="button"
            class="
              flex-shrink-0
              rounded-full
              p-1
              text-blue-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
              mr-3
            "
          >
            <span class="sr-only">View notifications</span>
            <QuestionMarkCircleIcon class="h-7 w-7 text-gray-100" />
          </router-link>
          <router-link
            as="buttom"
            :to="{ name: 'AllNotification' }"
            type="button"
            class="
              flex-shrink-0
              rounded-full
              p-1
              text-blue-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <span class="relative inline-block">
              <BellAlertIcon class="h-7 w-7 text-gray-100" />
              <!-- <span v-if="!!notificationCount.unreadCount" class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {{ notificationCount.unreadCount }}
            </span> -->
            </span>
          </router-link>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton
                class="
                  flex
                  rounded-full
                  bg-white
                  text-sm
                  ring-2 ring-white ring-opacity-20
                  focus:outline-none focus:ring-opacity-100
                "
              >
                <span class="sr-only">Open user menu</span>
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
                  <span class="text-lg font-medium leading-none text-black"
                    >{{ personalData?.scoutName?.charAt(0) }}
                  </span>
                </span>
              </MenuButton>
            </div>
            <transition
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  absolute
                  -right-2
                  z-10
                  mt-2
                  w-48
                  origin-top-right
                  rounded-md
                  bg-white
                  py-1
                  shadow-lg
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem
                  v-for="item in secondaryNavigation"
                  :key="item?.name"
                  v-slot="{ active }"
                >
                  <router-link
                    :to="{ name: item.linkName }"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >{{ item.name }}
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{}"
                    @click="onLogoutClicked"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Ausloggen</router-link
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div
          v-if="isAuth"
          class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20"
        >
          <div class="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <!-- Left nav -->
            <div class="hidden lg:col-span-2 lg:block">
              <nav class="flex space-x-4">
                <TopNav
                  :navigation="navigation"
                  :secondaryNavigation="secondaryNavigation"
                />
              </nav>
            </div>
            <div class="px-12 lg:px-0">
              <!-- Search -->
              <SearchModal v-if="isAuth" @close="sidebarOpen=false" class="w-72"></SearchModal>
              <div v-else class="w-72 my-5"></div>
            </div>
          </div>
        </div>

        <!-- Menu button -->
        <div class="absolute right-0 flex-shrink-0 lg:hidden" v-if="isAuth">
          <!-- Mobile menu button -->
          <button
            @click="onButtonClicked"
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              bg-transparent
              p-2
              text-white
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
            "
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <span class="relative inline-block">
              <Bars3Icon class="h-6 w-6 text-white" />
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
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
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
    </div>
    <TopNavMobile
      :navigation="navigation"
      :secondaryNavigation="secondaryNavigation"
      @close="onCloseClicked"
      :sidebarOpen="sidebarOpen"
    />
  </div>
</template>

<script setup lang="ts">
import TopNavMobile from "@/modules/app/components/TopNavMobile.vue";
import TopNav from "@/modules/app/components/TopNav.vue";
import SimpleAvatar from "@/components/avatar/Simple.vue";
import SearchModal from "@/modules/dashboard/components/search/SearchModal.vue";

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

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { ref, computed, onUpdated } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useAppStore } from "@/modules/app/store/index";
const appStore = useAppStore();

import { useDashboardStore } from "@/modules/dashboard/store/index";
const dashbordStore = useDashboardStore();

import { useMessageStore } from "@/modules/message/store/index";
const messageStore = useMessageStore();

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useNotificationStore } from "@/modules/notification/store";
const notificationsStore = useNotificationStore();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

const notificationCount = computed(() => {
  return notificationsStore.notificationCount;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

const navigation = computed(() => {
  return [
    {
      name: "Home",
      linkName: "DashboardMain",
      icon: HomeIcon,
      route: "dashboard",
      isAuth: true,
    },
    {
      name: "Mitglieder",
      linkName: "AllUsers",
      icon: UserIcon,
      route: "person",
      isAuth: true,
    },
    {
      name: "Gruppen",
      linkName: "GroupMain",
      icon: UserGroupIcon,
      route: "group",
      isAuth: true,
    },
    {
      name: "Aufgaben",
      linkName: "TaskMain",
      icon: BellAlertIcon,
      route: "task",
      isAuth: true,
    },
    {
      name: "Veranstaltungen (Beta)",
      linkName: "EventMain",
      icon: CalendarDaysIcon,
      route: "event",
      isAuth: true,
    },
  ].filter((item) => !item.isAuth || isAuth.value);
});

const secondaryNavigation = computed(() => {
  return [
    {
      name: "Weitere Anwendungen",
      linkName: "InspiMain",
      route: "inspi",
      icon: PuzzlePieceIcon,
      isAuth: true,
    },
    {
      name: "Meine Daten",
      linkName: "Settings",
      route: "settings",
      icon: CogIcon,
      isAuth: true,
    },
    {
      name: "Hilfe",
      linkName: "HelpMain",
      route: "message-new-intern",
      icon: QuestionMarkCircleIcon,
      isAuth: true,
    },
    {
      name: "Login",
      linkName: "Login",
      route: "login",
      icon: ArrowRightIcon,
      isAuth: false,
      isNotAuth: true,
    },
  ].filter(
    (item) => (!item.isAuth || isAuth.value) && (item.isAuth || !isAuth.value)
  );
});

const route = useRoute();

const sidebarOpen = ref(false);

const currentRoute = computed(() => {
  return route.fullPath;
});

function onButtonClicked() {
  sidebarOpen.value = true;
}

function onCloseClicked() {
  sidebarOpen.value = false;
}

function onLogoutClicked() {
  authStore.logout();
}
</script>
