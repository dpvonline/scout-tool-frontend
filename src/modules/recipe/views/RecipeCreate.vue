<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
      <StepperNav :steps="steps" />
    </nav>
    <router-view />
    <span class="isolate inline-flex rounded-md shadow-sm">
      <PrimaryButton>Weiter</PrimaryButton>
    </span>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";
import StepperNav from "@/components/stepper/StepperNav.vue";
import PrimaryButton from "@/components/button/Primary.vue";

const steps = computed(() => {
  return [
    {
      id: 1,
      name: "Zutaten",
      description: "Rezeptzutaten und Mengen",
      link: "RecipeCreateIngredient",
      status: getStatus("RecipeCreateIngredient", ['RecipeCreateBasics', 'RecipeCreateSummary'])
    },
    {
      id: 2,
      name: "Eckdaten",
      description: "Eckdaten zu deinem Rezept",
      link: "RecipeCreateBasics",
      status: getStatus("RecipeCreateBasics", ['RecipeCreateSummary'])
    },
    {
      id: 3,
      name: "Übersucht",
      description: "Zusammenfassung und speichern.",
      link: "RecipeCreateSummary",
      status: getStatus("RecipeCreateSummary", [])
    },
  ];
});

import { useRouter } from "vue-router";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const router = useRouter();

const currentRoute = computed(() => {
  return router.currentRoute.value.name;
});

function getStatus(value: string, next: Array<String>) {
  let status = router.currentRoute.value.name === value ? 'current' : '';
  status = next.includes(router.currentRoute.value.name) ? 'complete' : status
  return status;
}

const recipeStore = useRecipeStore();
const recipes = computed(() => {
  return recipeStore.recipes.slice(0, 5);
});

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>