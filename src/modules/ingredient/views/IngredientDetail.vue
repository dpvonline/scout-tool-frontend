<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">
      <article v-if="ingredientDetail.name">
        <!-- Tabs -->
        <TabGroup as="div" class="mt-2">
          <div class="border-b border-gray-200">
            <TabList class="-mb-px flex space-x-8 px-4">
              <Tab as="template" v-for="tab in tabs" :key="tab.name">
                <router-link
                  :to="{ name: tab.linkName }"
                  tag="button"
                  :class="[
                    tab.selected
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-900 border-transparent',
                    'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium text-center',
                  ]"
                >
                  {{ tab.name }}
                </router-link>
              </Tab>
            </TabList>
          </div>
          <TabPanels as="template">
            <router-view></router-view>
            <router-view></router-view>
            <router-view></router-view>
          </TabPanels>
        </TabGroup>
      </article>
      <div class="xl:hidden" v-else>Bitte Wähle eine Zutat</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import { useRoute } from "vue-router";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const route = useRoute();

const pages = computed(() => {
  return [
    { name: "Zutaten", link: "IngredientMain" },
    {
      name: `${ingredientDetail.value.name}`,
      link: `IngredientNutrients`
    },
  ];
});

const tabs = [
  {
    name: "Nährwerte",
    id: 1,
    linkName: "IngredientNutrients",
    component: "Nutrients",
    selected: true,
  },
  {
    name: "Portionen",
    id: 2,
    linkName: "IngredientPortions",
    component: "Portions",
    selected: false,
  },
  {
    name: "Preise",
    id: 3,
    linkName: "IngredientPrices",
    component: "Price",
    selected: false,
  },
];

const ingredientStore = useIngredientStore();
const ingredientDetail = computed(() => {
  return ingredientStore.ingredientDetail;
});

watch(
  () => route,
  () => {
    onTabClicked(route.name);
  },
  { immediate: true, deep: true }
);

function onTabClicked(selectedName: string) {
  tabs.forEach((tab) => {
    if (selectedName === tab.linkName) {
      tab.selected = true;
    } else {
      tab.selected = false;
    }
  });
}

onMounted(() => {
  const id = route.params.id;
  ingredientStore.fetchIngredientById(id);
});
</script>