<template>
  <StepFrame header="" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Persönliches
      </legend>
      <p class="text-sm text-gray-500">
        Damit wir Veranstaltungen besser planen brauchen wir diese Daten.
      </p>
      <div class="mt-4 space-y-4">
    <BaseField
      component="Date"
      :label="'Geburtsdatum*'"
      techName="birthdate"
      v-model="state.birthdate"
      :errors="errors.birthdate?.$errors"
    />
    <BaseField
      component="Radio"
      :label="'Geschlecht*'"
      techName="gender"
      v-model="state.gender"
      :choices="[
        { id: 'f', title: 'weiblich' },
        { id: 'm', title: 'männlich' },
        { id: 'd', title: 'diver' },
        { id: 'u', title: 'keine Angabe' },
      ]"
      :errors="errors.gender?.$errors"
      :items="registerStore.genderMappings"
    />
    <BaseField
      component="PhoneNumber"
      :label="'Handynummer'"
      techName="mobileNumber"
      v-model="state.mobileNumber"
      :errors="errors.mobileNumber?.$errors"
    />
      </div></fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";

const registerStore = useRegisterStore();
const initialState = registerStore.personalDetails;

const state = reactive({
  mobileNumber: initialState.mobileNumber,
  gender: initialState.gender,
  birthdate: initialState.birthdate,
});

const rules = {
  mobileNumber: {},
  gender: {
    required: helpers.withMessage(
      "Dieses Feld muss angegeben werden.",
      required
    ),
  },
  birthdate: {
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
  console.log(errors);

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  registerStore.updateBasics(state);

  router.push({
    name: "RegisterAdvanced",
  });
}
</script>
