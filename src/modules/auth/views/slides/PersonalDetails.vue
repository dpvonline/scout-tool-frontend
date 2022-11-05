<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Vorname'"
      techName="firstName"
      v-model="state.firstName"
      :errors="errors.firstName?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Nachname'"
      techName="lastName"
      v-model="state.lastName"
      :errors="errors.lastName?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Addresse'"
      techName="address"
      v-model="state.address"
      :errors="errors.address?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Addresszusatz'"
      techName="addressSupplement"
      v-model="state.addressSupplement"
      :errors="errors.addressSupplement?.$errors"
    />
    <BaseField
      component="Date"
      :label="'Geburtsdatum'"
      techName="birthdate"
      v-model="state.birthdate"
      :errors="errors.birthdate?.$errors"
    />
    <BaseField
      component="ZIP"
      :label="'PLZ'"
      techName="zipCode"
      v-model="state.zipCode"
      :errors="errors.zipCode?.$errors"
    />
    <BaseField
      component="Select"
      :label="'Geschlecht'"
      techName="gender"
      v-model="state.gender"
      :errors="errors.gender?.$errors"
      :items="[
        { id: 1, name: 'männlich' },
        { id: 2, name: 'weiblich' },
        { id: 3, name: 'divers' },
        { id: 4, name: 'keine Angabe' },
      ]"
    />
    <BaseField
      component="PhoneNumber"
      :label="'Handynummer'"
      techName="mobileNumber"
      v-model="state.mobileNumber"
      :errors="errors.mobileNumber?.$errors"
    />
    <BaseField
      component="Toggle"
      :label="'Ich habe die Datenschutzbestimmung gelesen und akzeptiert'"
      techName="dsgvoConfirmed"
      v-model="state.dsgvoConfirmed"
      :errors="errors.dsgvoConfirmed?.$errors"
    />
    <BaseField
      component="Select"
      :label="'E-Mail Benachrichtigungen'"
      techName="emailNotification"
      v-model="state.emailNotification"
      :errors="errors.emailNotification?.$errors"
      :items="[
        { id: 1, name: 'Alles' },
        { id: 2, name: 'Täglich' },
        { id: 3, name: 'Wöchentlich' },
        { id: 4, name: 'Nur wichtiges' },
      ]"
    />
    <BaseField
      component="Toggle"
      :label="'SMS Benachrichtigungen'"
      techName="smsNotification"
      v-model="state.smsNotification"
      :errors="errors.smsNotification?.$errors"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";
import { RegisterPersonalDetails } from "./types";

const registerStore = useRegisterStore();

const initialState = registerStore.personalDetails

const state = reactive<RegisterPersonalDetails>({
  mobileNumber: initialState.mobileNumber,
  dsgvoConfirmed: initialState.dsgvoConfirmed,
  emailNotification: initialState.emailNotification,
  smsNotification: initialState.smsNotification,
  firstName: initialState.firstName,
  lastName: initialState.lastName,
  address: initialState.address,
  addressSupplement: initialState.addressSupplement,
  zipCode: initialState.zipCode,
  gender: initialState.gender,
  birthdate: initialState.birthdate,
});

const rules = {
  mobileNumber: {},
  dsgvoConfirmed: {
    sameAs: sameAs(true)
  },
  emailNotification: {
    required
  },
  smsNotification: {
    required
  },
  firstName: {
    required
  },
  lastName: {
    required
  },
  address: {
    required
  },
  addressSupplement: {},
  zipCode: {
    required
  },
  gender: {
    required,
  },
  birthdate: {
    required
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref([]);

const commonStore = useCommonStore();

function onNextButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  registerStore.updatePersonalDetails(state);

  console.log(registerStore.basics)
  console.log(registerStore.scoutDetails)
  console.log(registerStore.personalDetails)
  //todo submits
}
</script>
