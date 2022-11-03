<template>
  <div class="2xl:px-64 xl:px-30">
  <div class="2xl:px-64 xl:px-30">
    <EmptyItem @onAddRecipeItem="onAddRecipeItem" />
    <RecipeItemUpdate
      :open="openRecipeItemUpdate"
      @close="onRecipeItemUpdateClose"
      header="Zutat"
    />
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import EmptyItem from "@/modules/recipe/components/simulator/EmptyItem.vue";
import RecipeItemUpdate from "@/modules/recipe/components/RecipeItem/RecipeItem.vue";
import { useRoute } from "vue-router";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const route = useRoute();

const openRecipeItemUpdate = ref(false);

const ingredientStore = useIngredientStore();
const ingredients = computed(() => {
  return ingredientStore.ingredients;
});

function onAddRecipeItem() {
  openRecipeItemUpdate.value = true;
}

function onRecipeItemUpdateClose() {
  openRecipeItemUpdate.value = false;
}

const buttonList = [{ name: "Neue Zutat", linkName: "IngredientCreate" }];

onMounted(() => {
  ingredientStore.fetchIngredients(route.query);
});
</script>
