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
        <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
          <button
            type="button"
            class="
              flex-shrink-0
              rounded-full
              p-1
              text-cyan-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
              mr-3
            "
          >
            <span class="sr-only">View notifications</span>
            <QuestionMarkCircleIcon class=" h-6 w-6 text-gray-100"/>
          </button>
          <button
            type="button"
            class="
              flex-shrink-0
              rounded-full
              p-1
              text-cyan-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <span class="sr-only">View notifications</span>
            <BellAlertIcon class=" h-6 w-6 text-gray-100"/>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-4 flex-shrink-0">
            <div>
              <button
                type="button"
                class="
                  flex
                  rounded-full
                  bg-white
                  text-sm
                  ring-2 ring-white ring-opacity-20
                  focus:outline-none focus:ring-opacity-100
                "
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                {{ 'r' }}
              </button>
            </div>
          </div>
        </div>

        <div
          class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20"
        >
          <div class="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <!-- Left nav -->
            <div class="hidden lg:col-span-2 lg:block">
              <nav class="flex space-x-4">
                <TopNav :navigation="navigation" :secondaryNavigation="secondaryNavigation"/>
              </nav>
            </div>
            <div class="px-12 lg:px-0">
              <!-- Search -->
              <SearchModal class="w-72"></SearchModal>
            </div>
          </div>
        </div>

        <!-- Menu button -->
        <div class="absolute right-0 flex-shrink-0 lg:hidden">
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
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
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
      <TopNavMobile :navigation="navigation" @close="onCloseClicked" :sidebarOpen="sidebarOpen"/>
  </div>
</template>

<script setup lang="ts">
import TopNavMobile from '@/modules/app/components/TopNavMobile.vue'
import TopNav from '@/modules/app/components/TopNav.vue'
import SimpleAvatar from '@/components/avatar/Simple.vue'
import SearchModal from '@/modules/dashboard/components/search/SearchModal.vue'

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

import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

import { useAppStore } from "@/modules/app/store/index.ts";
const appStore = useAppStore();

import { useDashboardStore } from "@/modules/dashboard/store/index.ts";
const dashbordStore = useDashboardStore();

import { useMessageStore } from "@/modules/message/store/index";
const messageStore = useMessageStore();

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
    // {
    //   name: "Aufgaben",
    //   linkName: "TaskMain",
    //   icon: BellAlertIcon,
    //   route: "task",
    //   isAuth: true,
    // },
    // {
    //   name: "Anliegen",
    //   linkName: "MessageMain",
    //   icon: InboxIcon,
    //   route: "message",
    //   isAuth: true,
    // },
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
  authStore.logout()
}
</script>
