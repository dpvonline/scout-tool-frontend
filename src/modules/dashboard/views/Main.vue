<template>
  <div class="h-full" >
    <div class="flex flex-1 flex-col 2xl:pa-64">
      <main class="relative h-screen flex-1 pb-8 overflow-y-auto" >
        <div class="mt-8">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-medium leading-6 text-gray-900">
              Zusammenfassung
            </h2>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <!-- Card -->
              <div
                v-for="card in cards"
                :key="card.name"
                class="overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <component
                        :is="card.icon"
                        class="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="truncate text-sm font-medium text-gray-500">
                          {{ card.name }}
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ card.amount }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <div class="text-sm">
                    <router-link
                      :to="{ name: card.href }"
                      class="font-medium text-blue-700 hover:text-blue-900"
                      >Anzeigen</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2
            class="
              mx-auto
              mt-8
              max-w-6xl
              px-4
              text-lg
              font-medium
              leading-6
              text-gray-900
              sm:px-6
              lg:px-8
            "
          >
            Neuesten Rezepte
          </h2>
          <RecipeList :recipes="recipes.slice(0, 4)" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ScaleIcon } from "@heroicons/vue/24/outline";

import RecipeList from "@/modules/dashboard/components/RecipeList.vue";

import { useRecipeStore } from "@/modules/recipe/store/index.ts";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const recipeStore = useRecipeStore();
const recipes = computed(() => {
  return recipeStore.recipes;
});

const ingredientStore = useIngredientStore();
const ingredients = computed(() => {
  return ingredientStore.ingredients;
});

const cards = computed(() => {
  return [
    {
      name: "Rezepte",
      href: "RecipesMain",
      icon: ScaleIcon,
      amount: recipes.value.length,
    },
    {
      name: "Zutaten",
      href: "IngredientMain",
      icon: ScaleIcon,
      amount: ingredients.value.length,
    },
  ];
});

onMounted(() => {
  recipeStore.fetchRecipes();
  ingredientStore.fetchIngredients();
});
</script>