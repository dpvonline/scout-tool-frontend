<template>
  <TabPanel class="space-y-12 px-4 py-6">
    <div>
      <div
        class="
          border-b border-gray-200
          px-4
          py-4
          sm:flex sm:items-center sm:justify-between sm:px-6
          lg:px-8
        "
      >
        <div class="min-w-0 flex-1">
          <h3 class="text-lg font-medium text-gray-900">Nährwerte von {{ ingredientDetail.name }}</h3>
          <p class="ml-3 max-w-2xl text-sm text-gray-500">
            Alle Daten pro 100g
          </p>
        </div>
        <div class="mt-4 flex-2 sm:mt-0 sm:ml-4">
          <PrimaryButton
            color="blue"
            label="Zutat Bearbeiten"
            @click="onEditClicked"
          />
        </div>
        <div class="mt-4 flex-2 sm:mt-0 sm:ml-4">
          <PrimaryButton
            color="red"
            label="Zutat Löschen"
            @click="onDeleteClicked"
          />
        </div>
      </div>
      <div class="mt-3">
        <dl
          class="sm:divide-y sm:divide-gray-200"
          v-for="item in nutriList"
          :key="item.name"
        >
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              {{ item.header }}
            </dt>
            <dd
              class="mt-1 text-sm sm:col-span-2 sm:mt-0"
              :class="
                ingredientDetail[`nutriPoints${capitalize(item.techName)}`] > 0
                  ? 'text-red-600'
                  : 'text-gray-600' &&
                    ingredientDetail[
                      `nutriPoints${capitalize(item.techName)}`
                    ] < 0
                  ? 'text-green-600'
                  : 'text-gray-600'
              "
            >
              {{ Math.round(ingredientDetail[item.techName], 1) }}
              {{ item.unit }} ({{
                ingredientDetail[`nutriPoints${capitalize(item.techName)}`]
              }}
              Nutri Punkte)
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <DeleteModal
      :open="openDeleteModal"
      :callbackOnConfirm="deleteIngredient"
      :callbackOnCancel="cancelModal"
    />
  </TabPanel>
</template>


<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";

import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

import PrimaryButton from "@/components/button/Primary.vue";
import DeleteModal from "@/components/modal/Delete.vue";

import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/vue/20/solid";

const route = useRoute();
const store = useIngredientStore();

const portionList = [{ header: "carbohydrateG", techName: "carbohydrateG" }];

const nutriList = [
  { header: "Kalorien", techName: "energyKj", unit: "kJ" },
  { header: "Eiweiß", techName: "proteinG", unit: "g" },
  { header: "gesättigte Fettsäuren", techName: "fatSatG", unit: "g" },
  { header: "Zucker", techName: "sugarG", unit: "g" },
  { header: "Salz", techName: "saltG", unit: "g" },
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
  { header: "Salz", techName: "nutriPointsSaltG", unit: "Punkte" },
  { header: "Balaststoffe", techName: "nutriPointsFibreG", unit: "Punkte" },
];

import { useRouter } from "vue-router";
const router = useRouter();

const ingredientDetail = computed(() => {
  return store.ingredientDetail;
});

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const openDeleteModal = ref(false);

function onDeleteClicked() {
  openDeleteModal.value = true;
}

function onEditClicked() {
  const id = route.params.id;
  router.push({
    name: "IngredientUpdate",
    params: {
      id,
    }
  });
}

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

function deleteIngredient() {
  store.deleteIngredient(ingredientDetail.value.id).then(() => {
    router.push({
      name: "IngredientMain",
    });
    commonStore.showSuccess("Zutat erfolgreich gelöscht");
    openDeleteModal.value = false;
  });
}

function cancelModal() {
  openDeleteModal.value = false;
}

onMounted(() => {
  const id = route.params.id;
  store.fetchIngredientById(id);
});
</script>