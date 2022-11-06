<template>
  <StepFrame header="Basis" @click="onNextButtonClicked" :isFinalStep="true">
    <BaseField component="Text" :label="'Vorname*'" techName="firstName" v-model="state.firstName"
      :errors="errors.firstName?.$errors" />
    <BaseField component="Text" :label="'Nachname*'" techName="lastName" v-model="state.lastName"
      :errors="errors.lastName?.$errors" />
    <BaseField component="Text" :label="'Addresse*'" techName="address" v-model="state.address"
      :errors="errors.address?.$errors" />
    <BaseField component="Text" :label="'Addresszusatz'" techName="addressSupplement" v-model="state.addressSupplement"
      :errors="errors.addressSupplement?.$errors" />
    <BaseField component="Date" :label="'Geburtsdatum*'" techName="birthdate" v-model="state.birthdate"
      :errors="errors.birthdate?.$errors" />
    <BaseField component="ZIP" :label="'PLZ*'" techName="zipCode" v-model="state.zipCode"
      :errors="errors.zipCode?.$errors" />
    <BaseField component="Select" :label="'Geschlecht*'" techName="gender" v-model="state.gender"
      :errors="errors.gender?.$errors" :items="registerStore.genderMappings" />
    <BaseField component="PhoneNumber" :label="'Handynummer'" techName="mobileNumber" v-model="state.mobileNumber"
      :errors="errors.mobileNumber?.$errors" />
    <BaseField component="Toggle" :label="'Ich habe die Datenschutzbestimmung gelesen und akzeptiert*'"
      techName="dsgvoConfirmed" v-model="state.dsgvoConfirmed" :errors="errors.dsgvoConfirmed?.$errors" />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";

const registerStore = useRegisterStore();

const initialState = registerStore.personalDetails;

const state = reactive({
  mobileNumber: initialState.mobileNumber,
  dsgvoConfirmed: initialState.dsgvoConfirmed,
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
    sameAs: helpers.withMessage('Dieses Feld muss akzeptiert werden.', sameAs(true)),
  },
  firstName: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
  lastName: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
  address: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
  addressSupplement: {},
  zipCode: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
  gender: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
  birthdate: {
    required: helpers.withMessage('Dieses Feld muss angegeben werden.', required),
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

const commonStore = useCommonStore();

async function onNextButtonClicked() {
  errors.value.$validate();
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  registerStore.updatePersonalDetails(state);

  try {
    const result = await registerStore.register()
    console.log('ergebnis:')
    console.log(result)

    alert('Herzlichen Glückwunsch, du bist registriert :D'
      + ' Du solltest demnächst eine Bestätigungs-E-Mail erhalten.'
      + ' Bestätige dort deine E-Mail-Adresse. Danach wirst du aufs Dashboard weitergeleitet,'
      + ' diesen Tab kannst du schließen.'
    )

    registerStore.setRegistered()

    router.push({name: 'Dashboard'})
  } catch (e) {
    console.log(e)
    alert('Fehler: ' + JSON.stringify(e.response.data))
  }
  //todo catch errors

}
</script>
