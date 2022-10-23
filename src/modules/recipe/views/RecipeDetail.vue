<template>
  <div class="2xl:px-64">
    <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none">
      <!-- Breadcrumb -->
      <nav
        class="flex items-start px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <router-link
          :to="{ name: 'RecipesMain' }"
          class="
            inline-flex
            items-center
            space-x-3
            text-sm
            font-medium
            text-gray-900
          "
        >
          <ChevronLeftIcon
            class="-ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span> Zurück zur Rezept Übersicht</span>
        </router-link>
      </nav>
      <article>
        <div class="overflow-auto bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Rezept
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Details
            </p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{ recipesDetail.name }}
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Nutri
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <NutriBar :nutriClass="recipesDetail.nutriClass"/>
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  margotfoster@example.com
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Hinweise
                </dt>
                <dd v-if="recipesDetail && recipesDetail.hints && recipesDetail.hints.length" class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span v-for="hint in recipesDetail.hints" :key="hint.name" class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">{{ hint.name }}</span>
                </dd>
                <dd v-else class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Rezept ist super</span>
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">About</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Zutaten</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    class="
                      divide-y divide-gray-200
                      rounded-md
                      border border-gray-200
                    "
                  >
                    <li
                      v-for="item in recipesDetail.recipeItems" :key="item.name"
                      class="
                        flex
                        items-center
                        justify-between
                        py-3
                        pl-3
                        pr-4
                        text-sm
                      "
                    >
                      <div class="flex w-0 flex-1 items-center">
                        <ArchiveBoxIcon
                          class="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-2 w-0 flex-1 truncate"
                          >{{ item.quantity }} x {{ item.portion.name }} / {{ item.quantity * item.portion.weightG }} g</span
                        >
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          class="
                            font-medium
                            text-blue-600
                            hover:text-blue-500
                          "
                          >Editieren</a
                        >
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
  PaperClipIcon,
  ArchiveBoxIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/vue/20/solid";

import { useRoute } from "vue-router";

const route = useRoute();

import NutriClass from './../../../components/score/NutriBar.vue'

import { onMounted, computed } from "vue";
//import users store
import { useRecipeStore } from "@/modules/recipe/store/index.ts";
// declare store variable
const recipeStore = useRecipeStore();

const searchValue = ref();

const recipesDetail = computed(() => {
  return recipeStore.recipesDetail;
});

onMounted(() => {
  const id = route.params.id;
  recipeStore.fetchRecipeById(id);
});
</script>
