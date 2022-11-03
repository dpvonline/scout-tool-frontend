<template>
  <RecipeItemList
    @openRecipeItemAdd="openRecipeItemAdd"
    @openRecipeItemUpdate="openRecipeItemUpdate"
    :recipeItems="recipeItems"
    editable="true"
  />
  <dl class="sm:divide-y sm:divide-gray-200 border-t border-gray-200 px-2">
    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Nutri</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <NutriBar :nutriClass="recipeDetail.nutriClass" />
      </dd>
    </div>
    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Hinweise</dt>
      <dd
        v-if="recipeDetail && recipeDetail.hints && recipeDetail.hints.length"
        class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
      >
        <span
          v-for="hint in recipeDetail.hints"
          :key="hint.name"
          class="
            inline-flex
            rounded-full
            bg-red-100
            px-2
            text-xs
            font-semibold
            leading-5
            text-red-800
          "
          >{{ hint.name }}</span
        >
      </dd>
      <dd v-else class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <span
          class="
            inline-flex
            rounded-full
            bg-green-100
            px-2
            text-xs
            font-semibold
            leading-5
            text-green-800
          "
          >Rezept ist super</span
        >
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import RecipeItemList from "@/modules/recipe/components/RecipeItemList.vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const route = useRoute();
const props = defineProps({
  recipeItems: { type: Array, required: true },
});

const emit = defineEmits(["openRecipeItemUpdate", 'openRecipeItemAdd']);

const openRecipeItemUpdate = (reciptItem: Object) => {
  emit("openRecipeItemUpdate", reciptItem);
};
const openRecipeItemAdd = () => {
  emit("openRecipeItemAdd");
};

const recipeStore = useRecipeStore();

const recipeDetail = computed(() => {
  return recipeStore.recipeDetail;
});

onMounted(() => {
  const id = route.params.id;
  recipeStore.fetchRecipeById(id);
});
</script>
