<template>
  <div class="2xl:px-64">
    <List
      :name="'Rezepte'"
      :items="recipes"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="RecipesMain"
      detailPageLink="RecipeCreate"
    />
  </div>
  <!-- <div class="ma-10 sm:py-6 2xl:px-64">
    <div class="px-4 sm:flex sm:items-center">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Rezepte</h1>
        <p class="mt-2 text-sm text-gray-700">
          Hier siehst du eine Übersicht über alle Rezepte
        </p>
      </div>
      <div class="px-4 mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
        @click="onRecipeClicked"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            border border-transparent
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            sm:w-auto
          "
        >
          Rezept hinzufügen
        </button>
      </div>
    </div>
    <div class="px-4 mt-8 flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      sticky
                      top-0
                      z-10
                      border-b border-gray-300
                      bg-gray-50 bg-opacity-75
                      py-3.5
                      pl-4
                      pr-3
                      text-left text-sm
                      font-semibold
                      text-gray-900
                      backdrop-blur backdrop-filter
                      sm:pl-6
                      lg:pl-8
                    "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="
                      sticky
                      top-0
                      z-10
                      border-b border-gray-300
                      bg-gray-50 bg-opacity-75
                      py-3.5
                      pr-4
                      pl-3
                      backdrop-blur backdrop-filter
                      sm:pr-6
                      lg:pr-8
                    "
                  >
                    <span class="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(person, personIdx) in recipes" :key="person.email">
                  <td
                    :class="[
                      personIdx !== recipes.length - 1
                        ? 'border-b border-gray-200'
                        : '',
                      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ person.name }}
                  </td>
                  <td
                    :class="[
                      personIdx !== recipes.length - 1
                        ? 'border-b border-gray-200'
                        : '',
                      'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                    ]"
                  >
                    <router-link
                      :to="{ name: 'RecipeDetail', params: { id: person.id } }"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Anzeigen
                      </router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import List from "@/components/base/list/Main.vue";

import { onMounted, computed, watch } from "vue";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";
import { useRouter } from 'vue-router'

const router = useRouter()

const recipeStore = useRecipeStore();
const recipes = computed(() => {
  return recipeStore.recipes;
});

function onRecipeClicked() {
  debugger;
  router.replace({ name: 'RecipeCreate' })
}

  watch(() => () => {
    console.log(`MyCoolComponent - watch route.name changed to`);
    // Do something here...

  // Optionally you can set immediate: true config for the watcher to run on init
  }, { immediate: true, deep: true });

onMounted(() => {
  recipeStore.fetchRecipes();
});

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
  { name: 'Neues Rezept', linkName: 'RecipeCreate' },
]
</script>