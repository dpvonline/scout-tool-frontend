<template>
  <div class="2xl:px-64 xl:px-30">
    
    <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none">
      <!-- Breadcrumb -->
      <Breadcrumbs :pages="pages"/>
      <article>
        <div class="overflow-auto bg-white shadow sm:rounded-lg">
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Nutri
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <NutriBar :nutriClass="recipeDetail.nutriClass"/>
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Hinweise
                </dt>
                <dd v-if="recipeDetail && recipeDetail.hints && recipeDetail.hints.length" class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span v-for="hint in recipeDetail.hints" :key="hint.name" class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">{{ hint.name }}</span>
                </dd>
                <dd v-else class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Rezept ist super</span>
                </dd>
              </div>
              <RecipeItemList :recipeItems="recipeDetail.recipeItems"/>
            </dl>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue"
import RecipeItemList from "@/modules/recipe/components/RecipeItemList.vue"
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const route = useRoute();

const pages = computed(() => {
  return [
  { name: 'Rezepte', link: 'RecipesMain', current: false },
  { name: `${recipeDetail.value.name}`, link: `RecipeDetail`, current: true },
]
});

const recipeStore = useRecipeStore();

const recipeDetail = computed(() => {
  return recipeStore.recipeDetail;
});

onMounted(() => {
  const id = route.params.id;
  recipeStore.fetchRecipeById(id);
});
</script>
