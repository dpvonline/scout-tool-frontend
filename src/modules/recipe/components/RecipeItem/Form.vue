<template>
  <BaseField
    v-if="!isEdit"
    component="Select"
    label="Zutat"
    techName="ingredient"
    v-model="ingredient"
    :items="ingredients"
    :errors="errors.ingredient?.$errors"
  />
  <BaseField
    component="Select"
    v-model="state.portion"
    techName="portion"
    :disabled="!ingredient"
    label="Portion"
    :items="portions"
    :errors="errors.portion?.$errors"
  />
  <BaseField
    component="Number"
    :label="'Anzahl'"
    techName="quantity"
    v-model="state.quantity"
    :errors="errors.quantity?.$errors"
  />
  <PrimaryButton
    @click="onSaveClicked"
    :label="!isEdit ? 'Zutat hinzufügen' : 'Zutat bearbeiten'"
  />
  <PrimaryButton
    v-if="isEdit"
    class="mx-2 my-2"
    @click="onDeleteClicked()"
    color="red"
    label="Zutat löschen"
  />
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import Select from "@/components/field/Select.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";
import { useRecipeStore } from "@/modules/recipe/store/index.ts";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const state = reactive({
  portion: null,
  quantity: 1,
});

const rules = {
  portion: {
    required,
  },
  quantity: {
    required,
  },
};

const props = defineProps({
  reciptItem: { type: Object, required: true },
});

const v$ = useVuelidate(rules, state);

const ingredient = ref(null);
const errors = ref([]);
const isLoading = ref(false);

const ingredientStore = useIngredientStore();
const recipeStore = useRecipeStore();

const ingredients = computed(() => {
  return ingredientStore.ingredients;
});

watch(ingredient, (value) => {
  ingredientStore.fetchPortions({ ingredient__id: value?.id });
});

const portions = computed(() => {
  return ingredientStore.portions;
});

const isEdit = computed(() => {
  return !!props.reciptItem?.portion?.id;
});

watch(ingredientStore, (items) => {
  if (items && items.portions && items.portions.length) {
    if (props.reciptItem?.portion?.id) {
      state.portion = items.portions.filter((item) => item.id === props.reciptItem.portion.id)[0];
    } else {
      state.portion = items.portions[0]
    }
  }
});

function onDeleteClicked() {
  recipeStore.deleteRecipeItem(props.reciptItem.id).then((response) => {
    let recipeId = Number(route.params.id);
    goToRecipe(recipeId);
  });
}

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  let recipeId = Number(route.params.id);
  // new
  debugger;
  if (isNaN(recipeId) || route.name === "SimulatorStart") {
    debugger;
    recipeStore.createRecipe({}).then((response: any) => {
      recipeId = response.data.id;
      recipeStore
        .createRecipeItem({
          recipe: recipeId,
          portion: state.portion?.id,
          quantity: state.quantity,
        })
        .then((response2: any) => {
          goToRecipe(recipeId);
        });
    });
  }
  // new
  if (!isNaN(recipeId) && route.name === "SimulatorMain" && !isEdit.value) {
    recipeStore
      .createRecipeItem({
        recipe: recipeId,
        portion: state.portion?.id,
        quantity: state.quantity,
      })
      .then((response2: any) => {
        goToRecipe(recipeId);
      });
  }
  // edit
  if (!isNaN(recipeId) && route.name === "SimulatorMain" && isEdit.value) {
    recipeStore
      .updateRecipeItem({
        id: props.reciptItem?.id,
        recipe: recipeId,
        portion: state.portion?.id,
        quantity: state.quantity,
      })
      .then((response2: any) => {
        goToRecipe(recipeId);
      });
  }
}

function goToRecipe(recipeId: number) {
  router.push({
    name: "SimulatorMain",
    params: {
      id: recipeId,
    },
  });
  if (router.currentRoute.value.name === 'SimulatorMain') {
    router.go(router.currentRoute.value);
  }
}

import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  if (isEdit.value) {
    ingredientStore.fetchPortions();
    state.quantity = props.reciptItem?.quantity;
    state.portion = props.reciptItem?.portion.id;
  } else {
    state.portion = null;
    state.quantity = 1;
  }
  ingredientStore.fetchIngredients()
});
</script>
