<template>
  <div>
  <nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex w-full space-x-4 px-4 sm:px-6">
      <li class="flex">
        <div class="flex items-center">
          <button @click="$router.go(-1)" class="text-gray-400 hover:text-gray-500">
            <ChevronLeftIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          </button>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg class="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <router-link :to="{ name: page.link }" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</router-link>
        </div>
      </li>
    </ol>
  </nav>
    <main class="relative z-40 flex-1 focus:outline-none">
      <article v-if="ingredientDetail.name">
        <!-- Tabs -->
        <TabGroup as="div" class="mt-2">
          <div class="border-b border-gray-200">
            <TabList class="-mb-px flex space-x-8 px-4">
              <Tab
                as="template"
                v-for="category in tabs"
                :key="category.name"
                v-slot="{ selected }"
              >
                <button
                  @click="onTabClicked(category.name)"
                  :class="[
                    selected
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-900 border-transparent',
                    'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium',
                  ]"
                >
                  {{ category.name }}
                </button>
              </Tab>
            </TabList>
          </div>
          <TabPanels as="template">
            <Nutrients/>
            <Portions/>
          </TabPanels>
        </TabGroup>
      </article>
      <div class="xl:hidden" v-else>Bitte Wähle eine Zutat</div>
    </main>
  </div>
</template>

<script setup lang="ts">
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
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  HomeIcon
} from "@heroicons/vue/20/solid";

import Nutrients from "./tabs/Nutrients.vue"
import Portions from "./tabs/Portions.vue"


const pages = computed(() => {
  return [
  { name: 'Zutaten', link: 'IngredientMain', current: false },
  { name: `${ingredientDetail.value.name}`, link: `IngredientNutrients`, current: true },
]
});



const tabs = [
  { name: "Nährwerte", id: 1, current: true, route: 'IngredientNutrients', component: 'Nutrients' },
  { name: "Portionen", id: 2, current: false, route: 'IngredientPortions', component: 'Portions' },
];

import { useRouter } from 'vue-router'


const router = useRouter()


import { onMounted, computed } from "vue";
import { useRoute } from 'vue-router'
//import users store
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";
// declare store variable
const ingredientStore = useIngredientStore();

const searchValue = ref();

const ingredients = computed(() => {
  return ingredientStore.ingredients;
});
const ingredientDetail = computed(() => {
  return ingredientStore.ingredientDetail;
});
const portions = computed(() => {
  return ingredientStore.portions;
});
function updateSearch() {
  ingredientStore.fetchIngredients({search: searchValue.value});
}
function onIngredientClicked(id) {
  ingredientStore.fetchIngredientById(id);
  ingredientStore.fetchPortions({ ingredient__id: id });
  router.push({
    name: 'IngredientNutrients',
    params: {
      id,
    }
  })
}
function onTabClicked(selectedName) {
  tabs.forEach((tab) => {
    if (selectedName === tab.name) {
      tab.selected = true
      router.push({
        name: tab.route,
      })
    }
  });
}
const route = useRoute();

onMounted(() => {
  const id = route.params.id
  ingredientStore.fetchIngredientById(id);
});
</script>