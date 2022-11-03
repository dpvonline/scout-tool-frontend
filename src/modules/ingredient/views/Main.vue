<template>
  <div class="2xl:px-64 xl:px-30">
    <List
      :name="'Zutaten'"
      :items="ingredients"
      :searchValue="searchValue"
      :sortOptions="sortOptions"
      :filters="filters"
      :buttonList="buttonList"
      mainPageLink="IngredientMain"
      detailPageLink="IngredientNutrients"
    >
      <template #listitem="{ item }">
        <div class="flex min-w-0 flex-1 items-center">
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p class="truncate text-sm font-medium text-blue-600">
                {{ item.name }}
              </p>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <TagIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span class="truncate">{{ item.majorClass }}</span>
              </p>
            </div>
            <div class="hidden md:block">
              <div>
                <p class="mt-1 flex items-center text-sm text-gray-500">
                  <NutriSlim :nutriClass="item.nutriClass" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import { useRoute } from "vue-router";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const ingredientStore = useIngredientStore();

const searchValue = ref();

const route = useRoute();

const ingredients = computed(() => {
  return ingredientStore.ingredients;
});

onMounted(() => {
  ingredientStore.fetchIngredients(route.query);
});

watch(
  () => route.query,
  () => {
    updateSearch(route.query);
  },
  { immediate: true, deep: true }
);

function updateSearch(params) {
  ingredientStore.fetchIngredients(params);
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
const buttonList = [{ name: "Neue Zutat", linkName: "IngredientCreate" }];
</script>
