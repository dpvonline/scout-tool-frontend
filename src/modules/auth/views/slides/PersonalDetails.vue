<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Mobile Number'"
      techName="mobilenumber"
      v-model="state.mobilenumber"
      :errors="errors.mobilenumber?.$errors"
    />
    <BaseField
      component="Text"
      :label="'DSGVO'"
      techName="dsgvo"
      v-model="state.dsgvo"
      :errors="errors.dsgvo?.$errors"
    />
    <BaseField
      component="Text"
      :label="'E-Mail Notification'"
      techName="emailnotification"
      v-model="state.emailnotification"
      :errors="errors.emailnotification?.$errors"
    />
    <BaseField
      component="Text"
      :label="'SMS Notification'"
      techName="smsnotification"
      v-model="state.smsnotification"
      :errors="errors.smsnotification?.$errors"
    />
    <BaseField
      component="Text"
      :label="'first name'"
      techName="firstname"
      v-model="state.firstname"
      :errors="errors.firstname?.$errors"
    />
    <BaseField
      component="Text"
      :label="'last name'"
      techName="lastname"
      v-model="state.lastname"
      :errors="errors.lastname?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Address'"
      techName="address"
      v-model="state.address"
      :errors="errors.address?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Address Zusatz'"
      techName="addressextra"
      v-model="state.addressextra"
      :errors="errors.addressextra?.$errors"
    />
    <BaseField
      component="Date"
      :label="'Geburtsdatum'"
      techName="birthdate"
      v-model="state.birthdate"
      :errors="errors.birthdate?.$errors"
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

const state = reactive({
  mobileNumber: 0,
  dsgvoConfirmed: false,
  emailNotification: "",
  smsNotification: false,
  firstName: "",
  lastName: "",
  address: "",
  addressSupplement: "",
  zipCode: 0,
  gender: "",
  birthDate: "",
});

const rules = {
  mobileNumber: {
    required,
  },
  dsgvoConfirmed: sameAs(true),
  emailNotification: {
    required,
  },
  smsNotification: sameAs(true),
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  address: {
    required,
  },
  addressSupplement: {},
  zipCode: {
    required,
  },
  gender: {
    required,
  },
  birthDate: {
    required,
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
