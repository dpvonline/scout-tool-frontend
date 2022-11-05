<template>
  <StepFrame header="Basis" @click="onNextButtonClicked">
    <BaseField
      component="Text"
      :label="'Username'"
      techName="username"
      v-model="state.username"
      :errors="errors.username?.$errors"
    />
    <BaseField
      component="Password"
      :label="'Password'"
      techName="password"
      v-model="state.password"
      :errors="errors.password?.$errors"
    />
    <BaseField
      component="Password"
      :label="'Password wiederholen'"
      techName="repeatpassword"
      v-model="state.repeatpassword"
      :errors="errors.repeatpassword?.$errors"
    />
    <BaseField
      component="EMail"
      :label="'E-Mail-Adresse'"
      techName="email"
      v-model="state.email"
      :errors="errors.email?.$errors"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs, email } from "@vuelidate/validators";
import { RegisterBasics } from "./types";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/modules/common/store/index";
import { useRegisterStore } from "@/modules/auth/store/index";

const state = reactive<RegisterBasics>({
  username: "",
  password: "",
  repeatPassword: "",
  email: "",
});

const rules = {
  username: {
    required,
    minLength: minLength(5),
  },
  password: {
    required,
    minLength: minLength(8),
  },
  repeatPassword: sameAs(state.password),//todo doesnt display error
  email: {
    required,
    email
  }
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

  registerStore.updateBasics(state);

  router.push({
    name: "RegisterScoutDetails",
  });
}
</script>
