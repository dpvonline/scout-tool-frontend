<template>
  <div class="2xl:px-64 xl:px-30">
  <div class="text-center">
    <div class="2xl:px-64 xl:px-30">
      <h2 class="mt-2 text-lg font-medium text-gray-900">Simulator</h2>
    </div>
  </div>
  <RecipeOverview
    :recipeItems="recipeDetail.recipeItems"
    @openRecipeItemUpdate="onOpenRecipeItemUpdate"
    @openRecipeItemAdd="openRecipeItemAdd"
  />
  <RecipeItemUpdate
    :open="openRecipeItemUpdate"
    :reciptItem="openRecipeItem"
    @close="onRecipeItemUpdateClose"
    header="Zutat"
  />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import EmptyItem from "@/modules/recipe/components/EmptyItem.vue";
import RecipeOverview from "@/modules/recipe/components/RecipeOverview.vue";
import RecipeItemUpdate from "@/modules/recipe/components/RecipeItem/RecipeItem.vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const route = useRoute();

const openRecipeItemUpdate = ref(false);
const openRecipeItem = ref({});

const recipeStore = useRecipeStore();

const recipeDetail = computed(() => {
  return recipeStore.recipeDetail;
});

function openRecipeItemAdd() {
  openRecipeItem.value = {};
  openRecipeItemUpdate.value = true;
}

function onOpenRecipeItemUpdate(reciptItem: Object) {
  openRecipeItemUpdate.value = true;
  openRecipeItem.value = reciptItem;
}

function onRecipeItemUpdateClose() {
  openRecipeItemUpdate.value = false;
}

const buttonList = [{ name: "Neue Zutat", linkName: "IngredientCreate" }];

onMounted(() => {
  const id = route.params.id;
  recipeStore.fetchRecipeById(id);
});
</script>
