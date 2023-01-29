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
          :label="'Fahrtenname*'"
          techName="scoutname"
          v-model="state.scoutName"
          :errors="errors.scoutName?.$errors"
          hint="Dieser Name ist ein freiwählbarer Anzeigename, der später geändert werden kann."
        />
        <BaseField
          component="AutoComplete"
          :label="'Stamm*'"
          techName="scoutgroup"
          v-model="state.scoutOrganisation"
          :errors="errors.scoutOrganisation?.$errors"
          :items="registerStore.scoutHierarchyMappings"
          hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
          :lookupListDisplay="['bund', '$ - Stamm ', 'name']"
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
import { required, helpers, maxLength } from "@vuelidate/validators";

const registerStore = useRegisterStore();
const initialState = registerStore.scout;

const state = reactive({
  scoutName: initialState.scoutName,
  scoutOrganisation: initialState.scoutOrganisation,
});

const rules = {
  scoutName: {
    required: helpers.withMessage(
      "Du musst einen Fahrtennamen angeben.",
      required
    ),
    maxLength: helpers.withMessage(
      "Der Fahrtenname darf nicht länger als 16 Zeichen sein.",
      maxLength(16)
    ),
  },
  scoutOrganisation: {
    required: helpers.withMessage(
      "Du musst einen Stamm auswählen, weil wir dich sonst nicht einordnen können.",
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

  registerStore.updateScout(state);

  router.push({
    name: "RegisterPersonalDetails",
  });
}
</script>
