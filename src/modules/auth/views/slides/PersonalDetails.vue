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
          :label="'Geburtsdatum'"
          techName="birthday"
          v-model="state.birthday"
          :errors="errors.birthday?.$errors"
          hint="Wir brauchen dein Geburtsdatum für Anmeldungen bei Veranstaltungen und um dich einer Altersstufe zuzuordnen"
        />
        <BaseField
          component="Radio"
          :label="'Geschlecht*'"
          techName="gender"
          v-model="state.gender"
          :choices="[
            { id: 'F', name: 'weiblich' },
            { id: 'M', name: 'männlich' },
            { id: 'D', name: 'divers' },
            { id: 'N', name: 'keine Angabe' },
          ]"
          hint="Wir brauchen dein Geschlecht für Anmeldungen bei Veranstaltungen."
          :errors="errors.gender?.$errors"
          :items="registerStore.genderMappings"
        />
        <BaseField
          component="PhoneNumber"
          :label="'Handynummer'"
          techName="phoneNumber"
          hint="Wir brauchen deine Handynummer, falls der Veranstaltungsorganisator dich erreichen möchte."
          v-model="state.phoneNumber"
          :errors="errors.phoneNumber?.$errors"
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
import { required, sameAs, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();
import { useRegisterStore } from "../../store";

const registerStore = useRegisterStore();
const initialState = registerStore.personal;

const state = reactive({
  phoneNumber: initialState.phoneNumber,
  gender: initialState.gender,
  birthday: initialState.birthday,
});

const rules = {
  phoneNumber: {},
  gender: {
    required: helpers.withMessage(
      "Dieses Feld muss angegeben werden.",
      required
    ),
  },
  // birthday: {
  //   required: helpers.withMessage(
  //     "Dieses Feld muss angegeben werden.",
  //     required
  //   ),
  // },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  registerStore.updatePersonal(state);

  router.push({
    name: "RegisterAdvanced",
  });
}
</script>
