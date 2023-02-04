<template>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
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

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="
                relative
                flex
                w-full
                max-w-xs
                flex-1 flex-col
                bg-white
                focus:outline-none
              "
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="
                      ml-1
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      focus:outline-none
                      focus:ring-2
                      focus:ring-inset
                      focus:ring-white
                    "
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <router-link :to="{ name: 'LandingMain' }">
                    <img
                      class="h-12 w-auto"
                      src="./../assets/logo.png"
                      alt="Pfadfinderlilie"
                    />
                  </router-link>
                </div>
                <nav aria-label="Sidebar" class="mt-5">
                  <div class="space-y-1 px-2">
                    <router-link
                      v-for="item in navigation"
                      :key="item.name"
                      @click="onButtonClicked"
                      :to="{ name: item.linkName }"
                      :class="[
                        item.linkName === currentRoute
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      ]"
                      :aria-current="
                        item.linkName === currentRoute ? 'page' : undefined
                      "
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          item.linkName === currentRoute
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                      <span
                        v-if="item.count"
                        :class="[
                          item.current
                            ? 'bg-white'
                            : 'bg-gray-100 group-hover:bg-gray-200',
                          'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                        ]"
                        >{{ item.count }}</span
                      >
                    </router-link>
                  </div>
                  <hr
                    v-if="secondaryNavigation.length"
                    class="my-5 border-t border-gray-200"
                    aria-hidden="true"
                  />
                  <div class="px-2">
                    <router-link
                      v-for="item in secondaryNavigation"
                      @click="onButtonClicked"
                      :key="item.name"
                      :to="{ name: item.linkName }"
                      class="
                        group
                        flex
                        items-center
                        rounded-md
                        px-2
                        py-2
                        text-base
                        font-medium
                        text-gray-600
                        hover:bg-gray-50 hover:text-gray-900
                      "
                      :class="[
                        item.linkName === currentRoute
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      ]"
                      :aria-current="
                        item.linkName === currentRoute ? 'page' : undefined
                      "
                    >
                      <component
                        :is="item.icon"
                        class="
                          mr-4
                          h-6
                          w-6
                          flex-shrink-0
                          text-gray-400
                          group-hover:text-gray-500
                        "
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </router-link>
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

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0" v-if="isAuth">
      <div class="flex w-64 flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="
            flex
            min-h-0
            flex-1 flex-col
            border-r border-gray-200
            bg-gray-100
          "
        >
          <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div class="flex flex-shrink-0 items-center px-4">
              <router-link :to="{ name: 'LandingMain' }">
                <img
                  class="h-16 w-auto"
                  src="./../assets/logo.png"
                  alt="Your Company"
                />
              </router-link>
            </div>
            <nav class="mt-5 flex-1" aria-label="Sidebar">
              <div class="space-y-1 px-2">
                <router-link
                  v-for="item in navigation"
                  @click="onButtonClicked"
                  :key="item.name"
                  :to="{ name: item.linkName }"
                  :class="[
                    currentRoute.includes(item.route)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="
                    currentRoute.includes(item.route) ? 'page' : undefined
                  "
                >
                  <component
                    :is="item.icon"
                    :class="[
                      currentRoute.includes(item.route)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  <span class="flex-1">{{ item.name }}</span>
                  <span
                    v-if="item.count"
                    :class="[
                      item.current
                        ? 'bg-white'
                        : 'bg-gray-100 group-hover:bg-gray-200',
                      'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                    ]"
                    >{{ item.count }}</span
                  >
                </router-link>
              </div>
              <hr
                v-if="secondaryNavigation.length"
                class="my-5 border-t border-gray-200"
                aria-hidden="true"
              />
              <div class="flex-1 space-y-1 px-2">
                <router-link
                  v-for="item in secondaryNavigation"
                  :key="item.name"
                  @click="onButtonClicked"
                  :to="{ name: item.linkName }"
                  class="
                    group
                    flex
                    items-center
                    rounded-md
                    px-2
                    py-2
                    text-sm
                    font-medium
                    text-gray-600
                    hover:bg-gray-50 hover:text-gray-900
                  "
                  :class="[
                    currentRoute.includes(item.route)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="
                    currentRoute.includes(item.route) ? 'page' : undefined
                  "
                >
                  <component
                    :is="item.icon"
                    class="
                      mr-3
                      h-6
                      w-6
                      flex-shrink-0
                      text-gray-400
                      group-hover:text-gray-500
                    "
                    aria-hidden="true"
                  />
                  {{ item.name }}
                  <span
                    v-if="item.count"
                    :class="[
                      item.current
                        ? 'bg-white'
                        : 'bg-gray-100 group-hover:bg-gray-200',
                      'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                    ]"
                    >{{ item.count }}</span
                  >
                </router-link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div v-bind="$attrs" class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <div class="lg:hidden" v-if="isAuth">
        <div
          class="
            flex
            items-center
            justify-between
            border-b border-gray-200
            bg-gray-50
            px-4
            py-1.5
          "
        >
          <div>
            <router-link :to="{ name: 'LandingMain' }">
              <img
                class="h-12 w-auto"
                src="./../assets/logo.png"
                alt="Your Company"
              />
            </router-link>
          </div>
          <div v-if="isAuth" class="flex flex-1 align-middle px-8 justify-end">
            <router-link
              :to="{ name: 'TaskMain' }"
              role="button"
              class="relative flex align-middle"
            >
              <BellIcon
                class="flex-1 w7 h-7 align-middle"
                viewbox="0 0 24 24"
              />
              <span
                class="
                  absolute
                  right-0
                  top-0
                  rounded-full
                  bg-red-600
                  w-4
                  h-4
                  top
                  right
                  p-0
                  m-0
                  text-white
                  font-mono
                  text-sm
                  leading-tight
                  text-center
                "
                >{{ openTaskCount }}
              </span>
            </router-link>
          </div>
          <div>
            <button
              type="button"
              class="
                -mr-3
                inline-flex
                h-12
                w-12
                items-center
                justify-center
                rounded-md
                text-gray-500
                hover:text-gray-900
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-600
              "
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="relative z-0 overflow-auto">
        <slot></slot>
      </div>
    </div>
</template>

<script setup lang="ts">
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
  BellIcon,
  InboxIcon,
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

const openTaskCount = computed(() => {
  return dashbordStore.openTaskCount;
});

const unProcessedMessages = computed(() => {
  return messageStore.unProcessedMessages;
});

const route = useRoute();

const sidebarOpen = ref(false);

const currentRoute = computed(() => {
  return route.fullPath;
});

function onButtonClicked() {
  sidebarOpen.value = false;
}

const navigation = computed(() => {
  return [
    {
      name: "Dashboard",
      linkName: "DashboardMain",
      icon: HomeIcon,
      route: "dashboard",
      isAuth: true,
    },
    // {
    //   name: "Mitglieder",
    //   linkName: "PersonMain",
    //   icon: UserIcon,
    //   route: "person",
    //   isAuth: true,
    // },
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
      icon: BellIcon,
      route: "task",
      isAuth: true,
      count: openTaskCount,
    },
    {
      name: "Nachrichten",
      linkName: "MessageMain",
      icon: InboxIcon,
      route: "message",
      isAuth: true,
      count: unProcessedMessages,
    },
  ].filter((item) => !item.isAuth || isAuth.value);
});

const secondaryNavigation = computed(() => {
  return [
    {
      name: "Meine Daten",
      linkName: "Settings",
      route: "settings",
      icon: CogIcon,
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
    {
      name: "Logout",
      linkName: "Logout",
      route: "logout",
      icon: ArrowLeftIcon,
      isAuth: true,
    }
  ].filter(
    (item) => (!item.isAuth || isAuth.value) && (item.isAuth || !isAuth.value)
  );
});

onMounted(() => {
  if (isAuth.value){ 
    dashbordStore.fetchMyRequests()
  }
});
</script>