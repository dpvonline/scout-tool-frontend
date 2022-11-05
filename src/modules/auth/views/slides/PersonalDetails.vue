<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Vorname'"
      techName="firstname"
      v-model="state.firstName"
      :errors="errors.firstname?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Nachname'"
      techName="lastname"
      v-model="state.lastName"
      :errors="errors.lastname?.$errors"
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
      techName="addressextra"
      v-model="state.addressSupplement"
      :errors="errors.addressSupplement?.$errors"
    />
    <BaseField
      component="Date"
      :label="'Geburtsdatum'"
      techName="birthdate"
      v-model="state.birthDate"
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
      techName="mobilenumber"
      v-model="state.mobileNumber"
      :errors="errors.mobilenumber?.$errors"
    />
    <BaseField
      component="Toggle"
      :label="'Ich habe die Datenschutzbestimmung gelesen und akzeptiert'"
      techName="dsgvo"
      v-model="state.dsgvoConfirmed"
      :errors="errors.dsgvoConfirmed?.$errors"
    />
    <BaseField
      component="Select"
      :label="'E-Mail Benachrichtigungen'"
      techName="emailnotification"
      v-model="state.emailNotification"
      :errors="errors.emailnotification?.$errors"
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
      techName="smsnotification"
      v-model="state.smsNotification"
      :errors="errors.smsnotification?.$errors"
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

const state = reactive<RegisterPersonalDetails>({
  mobileNumber: "",
  dsgvoConfirmed: false,
  emailNotification: "Nur wichtiges",
  smsNotification: false,
  firstName: "",
  lastName: "",
  address: "",
  addressSupplement: "",
  zipCode: "",
  gender: "keine Angabe",
  birthDate: "",
});

const rules = {
  mobileNumber: {},
  dsgvoConfirmed: sameAs(true),
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
  birthDate: {
    required
  },
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

  registerStore.updatePersonalDetails(state);

  //todo submits
}
</script>
