<template>
  <TabPanel class="space-y-12 px-4 py-6">
    <div>
      <div>
        <h3 class="text-lg font-medium leading-6 text-gray-900">Nährwerte</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Alle Daten pro 100g</p>
      </div>
      <div class="mt-5 border-t border-gray-200">
        <dl
          class="sm:divide-y sm:divide-gray-200"
          v-for="item in nutriList"
          :key="item.name"
        >
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              {{ item.header }}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ ingredientDetail[item.techName] }} {{ item.unit }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </TabPanel>
</template>


<script setup>
import { ref } from "vue";
import {
  TabPanel,
} from "@headlessui/vue";

import { useRoute } from 'vue-router'
import { onMounted, computed } from "vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";


const route = useRoute();
const store = useIngredientStore();

const portionList = [{ header: "carbohydrateG", techName: "carbohydrateG" }];

const nutriList = [
  { header: "Kalorien", techName: "energyKj", unit: "kJ" },
  { header: "Eiweiß", techName: "proteinG", unit: "g" },
  { header: "Fett", techName: "fatG", unit: "g" },
  { header: "gesättigte Fettsäuren", techName: "fatSatG", unit: "g" },
  { header: "Zucker", techName: "sugarG", unit: "g" },
  { header: "Salz", techName: "saltG", unit: "g" },
  { header: "Kohlenhydrate", techName: "carbohydrateG", unit: "g" },
  { header: "Ballaststoffe", techName: "fibreG", unit: "g" },
];
const scoreList = [
  { header: "Nutri-Score", techName: "nutriClass", unit: "Klasse" },
  { header: "Nutri-Punkte", techName: "nutriPoints", unit: "Punkte" },
  { header: "Energie", techName: "nutriPointsEnergyKj", unit: "Punkte" },
  { header: "Eiweiß", techName: "nutriPointsProteinG", unit: "Punkte" },
  {
    header: "Gesättigte Fettsäure",
    techName: "nutriPointsFatSatG",
    unit: "Punkte",
  },
  { header: "Zucker", techName: "nutriPointsSugarG", unit: "Punkte" },
  { header: "Salz", techName: "nutriPointsSodiumMg", unit: "Punkte" },
  { header: "Balaststoffe", techName: "nutriPointsFibreG", unit: "Punkte" },
];

const ingredientDetail = computed(() => {
  return store.ingredientDetail;
});

onMounted(() => {
  const id = route.params.id
  store.fetchIngredientById(id);
});
</script>