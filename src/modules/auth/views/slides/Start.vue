<template>
  <StepFrame header="Neuen Account anlegen" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Einverständniserklärungen
      </legend>
      <p class="text-sm text-gray-500">
        Du musst folgenden Bedinungen zustimmen.
      </p>
      <div class="mt-4 space-y-4">
      <BaseField
        component="Toggle"
        :label="'Ich habe die Datenschutzbestimmung gelesen und akzeptiert'"
        techName="dsgvoConfirmed"
        v-model="state.dsgvoConfirmed"
        :errors="errors.dsgvoConfirmed?.$errors"
        :cols="12"
      />
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import {
  sameAs,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "@/modules/auth/store/index";

const registerStore = useRegisterStore();

const state = reactive({
  dsgvoConfirmed: false
});

const rules = {
  dsgvoConfirmed: {
    checked: sameAs(true),
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

const commonStore = useCommonStore();

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  router.push({
    name: "RegisterBasics",
  });
}
</script>
