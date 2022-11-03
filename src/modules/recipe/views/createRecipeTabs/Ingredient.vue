<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Anzahl'"
      techName="name"
      v-model="state.name"
      :errors="errors.name?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Beschreibung'"
      techName="description"
      v-model="state.description"
      :errors="errors.description?.$errors"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue"

import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const state = reactive({
  name: null,
  description: null,
});

const rules = {
  name: {
    required,
    minLength: minLength(5),
  },
};

import { useRouter } from "vue-router";
const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref([]);

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

import { useRecipeStore } from "@/modules/recipe/store/index.ts";
const recipeStore = useRecipeStore();

function onNextButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  recipeStore.addCreateRecipeData(1, state);
  router.push({
    name: "RecipeCreateBasics",
  });
}
</script>

