<template>
  <StepFrame header="" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Pfadfinderdaten
      </legend>
      <p class="text-sm text-gray-500">
        Geb hier Pfadfinderdaten von dir an.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Text"
          :label="'Fahrtenname'"
          techName="scoutname"
          v-model="state.scoutName"
          :errors="errors.scoutname?.$errors"
        />
        <BaseField
          component="Select"
          :label="'Stamm*'"
          techName="scoutgroup"
          v-model="state.scoutOrganisation"
          :errors="errors.scoutOrganisation?.$errors"
          :items="registerStore.scoutHierarchyMappings"
        />
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";
import { required, helpers } from "@vuelidate/validators";

const registerStore = useRegisterStore();
const initialState = registerStore.scoutDetails;

const state = reactive({
  scoutName: initialState.scoutName,
  scoutOrganisation: initialState.scoutOrganisation,
});

const rules = {
  scoutOrganisation: {
    required: helpers.withMessage(
      "Dieses Feld muss angegeben werden.",
      required
    ),
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

const commonStore = useCommonStore();

function onNextButtonClicked() {
  errors.value.$validate();
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
