<template>
  <div>
    <!-- Content area -->
    <div class="md:pa-64">
      <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main class="flex-1">
          <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div class="pt-10 pb-16">
              <div class="px-4 sm:px-6 md:px-0">
                <div class="py-6">
                  <!-- Tabs -->
                  <div class="lg:hidden">
                    <label for="selected-tab" class="sr-only"
                      >Select a tab</label
                    >
                    <select
                      id="selected-tab"
                      name="selected-tab"
                      class="
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        py-2
                        pl-3
                        pr-10
                        text-base
                        focus:border-blue-500
                        focus:outline-none
                        focus:ring-blue-500
                        sm:text-sm
                      "
                    >
                      <option
                        v-for="tab in tabs"
                        :key="tab.name"
                        :selected="tab.current"
                      >
                        {{ tab.name }}
                      </option>
                    </select>
                  </div>
                  <div class="hidden lg:block">
                    <div class="border-b border-gray-200">
                      <nav class="-mb-px flex space-x-8">
                        <a
                          v-for="tab in tabs"
                          :key="tab.name"
                          :href="tab.href"
                          :class="[
                            tab.current
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                          ]"
                          >{{ tab.name }}</a
                        >
                      </nav>
                    </div>
                  </div>

                  <!-- Description list with inline editing -->
                  <div class="mt-10 divide-y divide-gray-200">
                    <div class="space-y-1">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Profile
                      </h3>
                      <p class="max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <div class="mt-6">
                      <dl class="divide-y divide-gray-200">
                        <div
                          class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow">Chelsea Hagon</span>
                            <span class="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div
                          class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Photo
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow">
                              <img
                                class="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </span>
                            <span
                              class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
                            >
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                                >|</span
                              >
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Remove
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div
                          class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow"
                              >chelsea.hagon@example.com</span
                            >
                            <span class="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div
                          class="
                            py-4
                            sm:grid
                            sm:grid-cols-3
                            sm:gap-4
                            sm:border-b
                            sm:border-gray-200
                            sm:py-5
                          "
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Job title
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow"
                              >Human Resources Manager</span
                            >
                            <span class="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div class="mt-10 divide-y divide-gray-200">
                    <div class="space-y-1">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Account
                      </h3>
                      <p class="max-w-2xl text-sm text-gray-500">
                        Manage how information is displayed on your account.
                      </p>
                    </div>
                    <div class="mt-6">
                      <dl class="divide-y divide-gray-200">
                        <div
                          class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Language
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow">English</span>
                            <span class="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div
                          class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
                        >
                          <dt class="text-sm font-medium text-gray-500">
                            Date format
                          </dt>
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <span class="flex-grow">DD-MM-YYYY</span>
                            <span
                              class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
                            >
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Update
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                                >|</span
                              >
                              <button
                                type="button"
                                class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Remove
                              </button>
                            </span>
                          </dd>
                        </div>
                        <SwitchGroup
                          as="div"
                          class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
                        >
                          <SwitchLabel
                            as="dt"
                            class="text-sm font-medium text-gray-500"
                            passive
                            >Automatic timezone</SwitchLabel
                          >
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <Switch
                              v-model="automaticTimezoneEnabled"
                              :class="[
                                automaticTimezoneEnabled
                                  ? 'bg-blue-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-auto',
                              ]"
                            >
                              <span
                                aria-hidden="true"
                                :class="[
                                  automaticTimezoneEnabled
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                ]"
                              />
                            </Switch>
                          </dd>
                        </SwitchGroup>
                        <SwitchGroup
                          as="div"
                          class="
                            py-4
                            sm:grid
                            sm:grid-cols-3
                            sm:gap-4
                            sm:border-b
                            sm:border-gray-200
                            sm:py-5
                          "
                        >
                          <SwitchLabel
                            as="dt"
                            class="text-sm font-medium text-gray-500"
                            passive
                            >Auto-update applicant data</SwitchLabel
                          >
                          <dd
                            class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
                          >
                            <Switch
                              v-model="autoUpdateApplicantDataEnabled"
                              :class="[
                                autoUpdateApplicantDataEnabled
                                  ? 'bg-blue-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-auto',
                              ]"
                            >
                              <span
                                aria-hidden="true"
                                :class="[
                                  autoUpdateApplicantDataEnabled
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                ]"
                              />
                            </Switch>
                          </dd>
                        </SwitchGroup>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Switch,
  SwitchGroup,
  SwitchLabel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
  {
    name: "Applications",
    href: "#",
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: "Messages",
    href: "#",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
  },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];
const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Password", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
  { name: "Plan", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Team Members", href: "#", current: false },
];

const sidebarOpen = ref(false);
const automaticTimezoneEnabled = ref(true);
const autoUpdateApplicantDataEnabled = ref(false);
</script>