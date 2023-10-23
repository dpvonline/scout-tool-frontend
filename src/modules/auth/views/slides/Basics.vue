<template>
  <StepFrame header="" @click="onNextButtonClicked">
    <fieldset class="mt-6 pb-2 border-b border-gray-200">
      <legend class="contents text-base font-medium text-gray-900">
        Dein DPV-Name
      </legend>
      <p class="text-sm text-gray-500 mb-3">
        Du musst folgenden Bedinungen zustimmen.
      </p>
      <div>
        <BaseField
          v-model="state.username"
          component="Text"
          hint="Das ist dein zukünftiger Name bei allen Digitalen Anwendungen im DPV. Der Name kann nicht mehr geändert werden. Der Username darf keine Leer oder Sonderzeichen enthaten."
          :label="'Benutzername*'"
          techName="username"
          :errors="errors.username?.$errors"
          :cols="1"
        />
      </div>
    </fieldset>
    <fieldset class="mt-6 pb-2 border-b border-gray-200">
      <legend class="contents text-base font-medium text-gray-900">
        Deine Pfadfinder E-Mail
      </legend>
      <p class="text-sm text-gray-500">
        Gebe eine bestehende E-Mail Adresse an, an die wir deine Pfadfinder
        E-Mail senden sollen.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          v-model="state.email"
          component="EMail"
          hint="Deine Pfadfinder E-Mail Adresse"
          :label="'E-Mail-Adresse*'"
          techName="email"
          :errors="errors.email?.$errors"
        />
      </div>
    </fieldset>
    <fieldset class="mt-6 pb-2">
      <legend class="contents text-base font-medium text-gray-900">
        Dein DPV-Passwort
      </legend>
      <p class="text-sm text-gray-500">
        Dein Passwort musst du hier einmaig festlegen. Du kannst es später
        zurücksetzen und ändern. Dieses Passwort wirst du für alle DPV-Dienst
        nutzen müssen.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          v-model="state.password"
          component="Password"
          hint="Passwort muss mindestens 8 Zeichen haben. Leerzeichen sind verboten. Mindestens eine Zahl. Mindestens ein Groß- und ein Kleinbustaben."
          :label="'Password*'"
          techName="password"
          :errors="errors.password?.$errors"
        />
        <BaseField
          v-model="state.repeatPassword"
          component="Password"
          hint="Wiederhole dein Passwort."
          :label="'Password wiederholen*'"
          techName="repeatPassword"
          :errors="errors.repeatPassword?.$errors"
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
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "@/modules/auth/store/index";

const registerStore = useRegisterStore();

const initialState = registerStore.account;

const state = reactive({
  username: initialState.username,
  password: initialState.password,
  repeatPassword: initialState.repeatPassword,
  email: initialState.email,
});

const reactivePassword = computed(() => {
  return state.password;
});

const usernameCheck = async function () {
  if (state.username === "") {
    return false;
  }
  return !(await registerStore.usernameCheck(state.username));
};

const emailCheck = async function () {
  if (state.email === "") {
    return false;
  }
  return !(await registerStore.emailCheck(state.email));
};

const passwordCheck = async function () {
  if (state.password === "") {
    return false;
  }
  return !(await registerStore.passwordCheck(state.password));
};

const rules = {
  username: {
    required: helpers.withMessage(
      "Du musst einen Benutzernamen angeben.",
      required
    ),
    metBackendRules: helpers.withMessage(
      "Dieser Benutzername ist bereits vergeben oder darf nicht verwendet werden.",
      helpers.withAsync(usernameCheck)
    ),
    minLength: minLength(2),
    maxLength: maxLength(20),
  },
  password: {
    required: helpers.withMessage("Du musst ein Passwort angeben.", required),
    minLength: helpers.withMessage(
      "Das Password muss mindestens 8 Zeichen lang sein.",
      minLength(8)
    ),
    containsUppercase: helpers.withMessage(
      "Das Password muss ein Großbuchstaben haben.",
      function (value) {
        return /[A-Z]/.test(value);
      }
    ),
    containsLowercase: helpers.withMessage(
      "Das Password muss ein Kleinbuchstaben haben.",
      function (value) {
        return /[a-z]/.test(value);
      }
    ),
    containsNumber: helpers.withMessage(
      "Das Password muss ein Zahl enthalten.",
      function (value) {
        return /[0-9]/.test(value);
      }
    ),
    containsSpecial: helpers.withMessage(
      "Das Password muss ein Sonderzeichen enthalten. z.B. #,?,!,@,$,%,^,&,*,-",
      function (value) {
        return /[#?!@$%^&*-]/.test(value);
      }
    ),
    metBackendRules2: helpers.withMessage(
      "Dieses Passwort entspricht nicht den Regeln.",
      helpers.withAsync(passwordCheck)
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

    metBackendRules3: helpers.withMessage(
      "Diese E-Mail ist bereits vergeben oder darf nicht verwendet werden.",
      helpers.withAsync(emailCheck)
    ),
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

  registerStore.updateAccount(state);

  router.push({
    name: "RegisterScoutDetails",
  });
}
</script>
