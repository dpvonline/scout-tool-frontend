<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Fahrtenname'"
      techName="scoutname"
      v-model="state.scoutName"
      :errors="errors.scoutname?.$errors"
    />
    <BaseField
      component="Number"
      :label="'Stamm'"
      techName="scoutgroup"
      v-model="state.scoutOrganisation"
      :errors="errors.scoutOrganisation?.$errors"
    />
    <BaseField
      component="Select"
      :label="'Stufe'"
      techName="scoutlevel"
      v-model="state.scoutLevel"
      :errors="errors.scoutlevel?.$errors"
      :items="[
        { id: 1, name: 'Wölfling' }, 
        { id: 2, name: 'Sippling' }, 
        { id: 3, name: 'Rover*in'},
      ]"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { RegisterScoutDetails } from "./types";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";

const state = reactive<RegisterScoutDetails>({
  scoutName: "",
  scoutOrganisation: 0,
  scoutLevel: "",
});

const rules = {
  scoutName: {},
  scoutOrganization: {},
  scoutlevel: {},
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref([]);

const commonStore = useCommonStore();

const registerStore = useRegisterStore();

function onNextButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  registerStore.updateScoutDetails(state);
  router.push({
    name: "RegisterPersonalDetails",
  });
}
</script>
