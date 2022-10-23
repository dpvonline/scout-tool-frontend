<template>
  <div class="2xl:px-64">
    <List
      :name="'Zutaten'"
      :items="ingredients"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="IngredientMain"
      detailPageLink="IngredientNutrients"
    />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
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
  BarsArrowUpIcon,
  MapIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  ChevronDownIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import { PlusIcon as PlusIconMini } from '@heroicons/vue/20/solid'
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/vue/20/solid";

import List from "./../../../components/base/list/Main.vue";

const tabs = [
  {
    name: "Nährwerte",
    id: 1,
    current: true,
    route: "IngredientNutrients",
    component: "Nutrients",
  },
  {
    name: "Portionen",
    id: 2,
    current: false,
    route: "IngredientPortions",
    component: "Portions",
  },
];

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();

import { onMounted, computed } from "vue";
//import users store
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";
// declare store variable
const ingredientStore = useIngredientStore();

const searchValue = ref();

const route = useRoute();

const ingredients = computed(() => {
  return ingredientStore.ingredients;
});


watch(() => route.query, () => {
  updateSearch(route.query);
}, { immediate: true, deep: true });

function updateSearch(params) {
  ingredientStore.fetchIngredients(params);
}

function updateQuery () {
  const query = Object.entries(this.filter).reduce((acc, [key, val]) => {
        if (!val) return acc
        return { ...acc, [key]: val }
  }, {})
  console.log(query);
}


function onButtonClicked() {
  console.log('Hallo ich wurde gedrückt. das war voll cool.')
}

const sortOptions = [
  { name: "A-Z", value: "alpha", current: true },
  { name: "Neuste", value: "-created_at", current: false },
  { name: "Gesund", value: "nutri_points", current: false },
];

const filters = [
  {
    id: "nutri_class",
    name: "Nutri Score",
    options: [
      { value: "1", label: "Klasse A", checked: false },
      { value: "2", label: "Klasse B", checked: false },
      { value: "3", label: "Klasse C", checked: false },
      { value: "4", label: "Klasse D", checked: false },
      { value: "5", label: "Klasse E", checked: false },
    ],
  },
  {
    id: "physical_viscosity",
    name: "Festigkeit",
    options: [
      { value: "beverage", label: "Flüssig", checked: false },
      { value: "solid", label: "Fest", checked: false },
    ],
  },
];
const buttonList = [
  { name: 'Neue Zutat', linkName: 'IngredientCreate' },
]
</script>

<style scoped>
.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.button1 {background-color: #4CAF50;} /* Green */
.button2 {background-color: #008CBA;} /* Blue */
</style>