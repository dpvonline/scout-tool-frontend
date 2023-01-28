<template>
  <StepFrame header="" @click="onNextButtonClicked" :isFinalStep="true">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Adresse
      </legend>
      <p class="text-sm text-gray-500">
        Für Zuschusslisten und Briefe brauchen wir deine Adresse.
      </p>
      <div class="mt-4 space-y-4">
    <BaseField
      component="Text"
      :label="'Vorname'"
      techName="firstName"
      hint="Geb deinen Vornamen ein und eventuelle weitere Vornamen."
      v-model="state.firstName"
      :errors="errors.firstName?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Nachname'"
      techName="lastName"
      hint="Geb deine Nachnamen ein."
      v-model="state.lastName"
      :errors="errors.lastName?.$errors"
    />
    <BaseField
      component="Text"
      :label="'Addresse'"
      techName="address"
      hint="Geb deine Straße und Hausnummer ein."
      v-model="state.address"
      :errors="errors.address?.$errors"
    />
    <BaseField
      component="ZIP"
      :label="'Postleitzahl'"
      techName="zipCode"
      v-model="state.zipCode"
      :errors="errors.zipCode?.$errors"
    />
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "../../store";

const registerStore = useRegisterStore();
const initialState = registerStore.advancedPersonal;

const state = reactive({
  firstName: initialState.firstName,
  lastName: initialState.lastName,
  address: initialState.address,
  addressSupplement: initialState.addressSupplement,
  zipCode: initialState.zipCode,
});

const rules = {
  // firstName: {
  //   required: helpers.withMessage(
  //     "Dieses Feld muss angegeben werden.",
  //     required
  //   ),
  // },
  // lastName: {
  //   required: helpers.withMessage(
  //     "Dieses Feld muss angegeben werden.",
  //     required
  //   ),
  // },
  // address: {
  //   required: helpers.withMessage(
  //     "Dieses Feld muss angegeben werden.",
  //     required
  //   ),
  // },
  // addressSupplement: {},
  // zipCode: {
  //   required: helpers.withMessage(
  //     "Dieses Feld muss angegeben werden.",
  //     required
  //   ),
  // },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

const commonStore = useCommonStore();

async function onNextButtonClicked() {
  errors.value.$validate()
  console.log(errors.value)
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen")
    return
  }

  registerStore.updateAdvancedPersonal(state)

  try {
    const result = await registerStore.register()
    console.log(result)

    registerStore.setRegistered()

    router.push({ name: "RegComplete" })
  } catch (e) {
    console.log(e)
    // alert("Fehler: " + JSON.stringify(e.response.data))
  }
}
</script>
