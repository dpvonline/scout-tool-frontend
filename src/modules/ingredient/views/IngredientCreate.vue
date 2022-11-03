<template>
  <Breadcrumbs :pages="pages" />
  <main
    class="
      relative
      h-screen
      z-40
      flex-1
      focus:outline-none
      overflow-y-auto
      pb-12
    "
  >
    <article class="flex-shrink-0 border border-gray-200 ma-12">
      <form class="space-y-8 divide-y px-3 py-4 divide-gray-200 xl:px-64">
        <div class="space-y-8 divide-y divide-gray-200">
          <h2 class="text-h1 font-medium text-gray-900">Zutaten</h2>
          <div class="pt-8">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Eckdaten
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Daten die über jede Zutat bekannt sein müssen
              </p>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <Base
                component="Text"
                :label="'Name der Zutat (erforderlich)'"
                techName="name"
                v-model="state.name"
                :errors="errors.name && errors.name.$errors"
              />
              <Base
                component="TextArea"
                :label="'Weiterer Beschreibener Text'"
                techName="description"
                v-model="state.description"
                :errors="errors.description && errors.description.$errors"
              />
              <Base
                component="Number"
                :label="'Physikalische Dichte'"
                techName="physicalDensity"
                v-model="state['physicalDensity']"
                :errors="errors.physicalDensity && errors.physicalDensity.$errors"
                hint="Um Volumen in Gewicht umzurechnen."
              />

              <Base
                component="Radio"
                :label="'Essen oder Getränk'"
                techName="physicalViscosity"
                hint="Für den Nutri Score"
                v-model="state['physicalViscosity']"
                :choices="[
                  { id: 'solid', title: 'Essen' },
                  { id: 'beverage', title: 'Getränk' },
                ]"
              />
              <Base
                component="Toggle"
                techName="fdcEnabled"
                v-model="fdcEnabled"
                :label="'Mit Datenimport aus der FDC Datenbank?'"
              />
              <Base
                v-if="fdcEnabled"
                component="Text"
                techName="fdcId"
                v-model="state['fdcId']"
                :label="'FDC-ID'"
                hint="Füge hier die passende FDC-ID ein."
                :errors="errors.fdcId && errors.fdcId.$errors"
              />
            </div>
          </div>

          <div v-if="!fdcEnabled" class="pt-8">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Inhaltsstoffe
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Wenn du keine FDC-ID hast, kannst du alles selbst eintragen.
              </p>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <Base
                component="Text"
                techName="majorClass"
                v-model="state['majorClass']"
                label="Hauptkategorie"
                hint="Wähle eine Hauptkategorie für deine Zutat."
                :errors="errors.majorClass && errors.majorClass.$errors"
              />
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <Base
                component="Number"
                v-for="nutrient in nutrientList"
                :key="nutrient.label"
                :techName="nutrient.techName"
                 v-model="state[nutrient.techName]"
                :label="nutrient.label"
                :hint="nutrient.hint"
                :errors="errors[nutrient.techName] && errors[nutrient.techName].$errors"
              />
            </div>
          </div>
        </div>

        <div class="pt-5 pb-12">
          <div class="flex justify-end">
            <PrimaryButton
              @click="onButtonClicked"
              label="Speichern"
              :isLoading="isLoading"
              
            />
          </div>
        </div>
      </form>
    </article>
  </main>
</template>


<script setup lang="ts">
import { reactive } from "vue";
import Base from "@/components/field/Base.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import Success from "@/modules/common/components/Success.vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();

const nutrientList = [
  {
    techName: "energyKj",
    label: "Energie in Kilojoule (kJ)",
  },
  {
    techName: "sugarG",
    label: "Zucker in Gramm (g)",
  },
  {
    techName: "fatSatG",
    label: "gesät. Fettsäuren in Gramm (g)",
  },
  {
    techName: "proteinG",
    label: "Einweiß in Gramm (g)",
  },
  {
    techName: "saltG",
    label: "Salz in Gramm (g)",
  },
  {
    techName: "fibreG",
    label: "Balaststoffe in Gramm (g)",
  },
];

const pages = computed(() => {
  return [
    { name: "Zutaten", link: "IngredientMain", current: false },
    {
      name: "Neue Zutat",
      link: `IngredientCreate`,
      current: true,
    },
  ];
});

const state = reactive({
  name: null,
  description: null,
  physicalDensity: 1,
  physicalViscosity: 'solid',
  fdcId: 2262074,
  // tags: null,
  energyKj: null,
  fatSatG: null,
  fibreG: null,
  proteinG: null,
  saltG: null,
  sugarG: null,
  majorClass: 'undefined',
});

const rules = {
  name: {
    required,
    minLength: minLength(5),
  },
  physicalDensity: { required },
  fdcId: {
    minLength: minLength(7),
    maxLength: maxLength(9),
  },
};

const v$ = useVuelidate(rules, state);

const fdcEnabled = ref(true);
const errors = ref([]);
const isLoading = ref(false);

const ingredientStore = useIngredientStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

function onButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;
  ingredientStore.createIngredient(state).then((response) => {
    if (response && response.status === 201) {
      router.push({
        name: "IngredientNutrients",
        params: { id: response.data.id }
      });
      commonStore.showSuccess("Zutat erfolgreich angelegt");
    }
    else if(response && response.status === 400) {
      commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
    } else {
      console.log(response);
    }
  }).finally(() => {
      isLoading.value = false;
  });
}
</script>
