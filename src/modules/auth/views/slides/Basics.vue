<template>
  <StepFrame header="" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Benutzername
      </legend>
      <p class="text-sm text-gray-500">
        Du musst folgenden Bedinungen zustimmen.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Text"
          hint="Das ist dein zukünftiger Name bei allen Digitalen Anwendungen im DPV."
          :label="'Benutzername*'"
          techName="username"
          v-model="state.username"
          :errors="errors.username?.$errors"
        />
        <BaseField
          component="EMail"
          hint="Deine Pfadfinder E-Mail Adresse"
          :label="'E-Mail-Adresse*'"
          techName="email"
          v-model="state.email"
          :errors="errors.email?.$errors"
        />
      </div>
    </fieldset>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Password"
          hint="Geb ein sicheres Passwort an."
          :label="'Password*'"
          techName="password"
          v-model="state.password"
          :errors="errors.password?.$errors"
        />
        <BaseField
          component="Password"
          hint="Wiederhole dein Passwort."
          :label="'Password wiederholen*'"
          techName="repeatPassword"
          v-model="state.repeatPassword"
          :errors="errors.repeatPassword?.$errors"
        />
      </div>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import BaseField from "@/components-common/field/Base.vue";
import StepFrame from "@/components-common/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "@/modules/auth/store/index";

const registerStore = useRegisterStore();

const initialState = registerStore.basics;

const state = reactive({
  username: initialState.username,
  password: initialState.password,
  repeatPassword: initialState.repeatPassword,
  email: initialState.email,
});

const reactivePassword = computed(() => {
  return state.password;
});

const usernameIsUnique = async function () {
  if (state.username === "") {
    return false;
  }
  return !(await registerStore.usernameAlreadyTaken(state.username));
};

const rules = {
  username: {
    required: helpers.withMessage(
      "Du musst einen Benutzernamen angeben.",
      required
    ),
    isUnique: helpers.withMessage(
      "Dieser Username ist bereits vergeben.",
      helpers.withAsync(usernameIsUnique)
    ),
  },
  password: {
    required: helpers.withMessage(
      "Du musst ein Passwort angeben.",
      required
    ),
    minLength: helpers.withMessage(
      "Das Password muss mindestens 8 Zeichen lang sein.",
      minLength(8)
    ),
  },
  repeatPassword: {
    required: helpers.withMessage(
      "Du musst das Passwort wiederholen.",
      required
    ),
    sameAs: helpers.withMessage(
      "Die Passwörter stimmen nicht überein.",
      sameAs(reactivePassword)
    ),
  },
  email: {
    required: helpers.withMessage(
      "Du musst deine E-Mail Adresse angeben.",
      required
    ),
    email: helpers.withMessage("Die E-Mail ist ungültig.", email),
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

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
    name: "RegisterScoutDetails",
  });
}
</script>
