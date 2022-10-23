<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
      <ol role="list" class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
        <li v-for="(step, stepIdx) in steps" :key="step.id" class="relative overflow-hidden lg:flex-1">
          <div :class="[stepIdx === 0 ? 'border-b-0 rounded-t-md' : '', stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '', 'border border-gray-200 overflow-hidden lg:border-0']">
            <router-link v-if="step.status === 'complete'" :to="{name: step.link }" class="group">
              <span class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                    <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </router-link>
            <a v-else-if="step.status === 'current'" :href="step.href" aria-current="step">
              <span class="absolute top-0 left-0 h-full w-1 bg-blue-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600">
                    <span class="text-blue-600">{{ step.id }}</span>
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-blue-600">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </a>
            <a v-else :href="step.href" class="group">
              <span class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                    <span class="text-gray-500">{{ step.id }}</span>
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-gray-500">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </a>
            <template v-if="stepIdx !== 0">
              <!-- Separator -->
              <div class="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                <svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                  <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke" />
                </svg>
              </div>
            </template>
          </div>
        </li>
      </ol>
    </nav>
    <router-view/>
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button type="button" class="relative inline-flex items-center rounded-l-md border border-gray-300 text-blue-700  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">Zurück</button>
       <button type="button" class="relative -ml-px inline-flex items-center rounded-r-md border text-blue-700  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">Weiter</button>
      </span>
  </div>
</template>


<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from "@heroicons/vue/20/solid";

import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const steps = [
  { id: 1, name: 'Zutaten', description: 'Vitae sed mi luctus laoreet.', link: 'RecipeCreateIngredient', status: 'complete' },
  { id: 2, name: 'Eckdaten', description: 'Cursus semper viverra.', link: 'RecipeCreateBasics', status: 'current' },
  { id: 3, name: 'Übersucht', description: 'Penatibus eu quis ante.', link: 'RecipeCreateSummary', status: 'upcoming' },
]

const recipeStore = useRecipeStore();
const recipes = computed(() => {
  return recipeStore.recipes.slice(0, 5);
});


onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>